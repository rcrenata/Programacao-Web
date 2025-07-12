import { Request, Response, RequestHandler } from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  removeUser,
  getUserByEmail,
  updatePassword
} from '../services/userService'; 
import { getMajors } from '../services/majorService'; 
import bcrypt from 'bcryptjs';

class UserController {
  public index: RequestHandler = async (req, res) => {
    try {
      const users = await getAllUsers();
      res.render('users/index', { users, title: "Lista de Usuários" });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).render('errors/500', { title: "Erro no Servidor" });
    }
  }

  public  create: RequestHandler = async (req, res) => {
    if (req.method === 'GET') {
      try {
        const majors = await getMajors();
        
        
        res.render('users/create', { majors, title: "Criar Nova Conta" });
      } catch (error) {
        console.error('Erro ao carregar formulário de criação de usuário:', error);
        res.status(500).send('Erro interno do servidor.');
      }
    } else if (req.method === 'POST') {
      try {
        const userData = req.body;

        if (!userData.fullname || !userData.email || !userData.password || !userData.major_id) {
            const majors = await getMajors();
            return res.status(400).render('users/create', {
                majors,
                error: 'Todos os campos são obrigatórios.',
                oldInput: userData,
                title: "Criar Nova Conta"
            });
        }

        if (await getUserByEmail(userData.email)) {
            const majors = await getMajors();
            return res.status(409).render('users/create', {
                majors,
                error: 'Já existe um usuário com este e-mail.',
                oldInput: userData,
                title: "Criar Nova Conta"
            });
        }

        await createUser(userData);
        res.redirect('/users/login'); 
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).render('errors/500');
      }
    }
  }

  public read: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);

      if (!user) {
        return res.status(404).render('errors/404', { title: 'Usuário não encontrado' });
      }
      res.render('users/read', { user, title: `Detalhes de ${user.fullname}` });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).render('errors/500');
    }
  }

  public update: RequestHandler = async (req, res) => {
    const { id } = req.params;

    if (req.method === 'GET') {
      try {
        const user = await getUserById(id);
        if (!user) {
          return res.status(404).render('errors/404');
        }
        const majors = await getMajors();
        res.render('users/update', { user, majors, title: `Atualizar ${user.fullname}` });
      } catch (error) {
        console.error('Erro ao carregar usuário para atualização:', error);
        res.status(500).render('errors/500');
      }
    } else if (req.method === 'POST') {
      try {
        const userData = req.body;
        await updateUser(id, userData);
        res.redirect(`/users/read/${id}`);
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).render('errors/500');
      }
    }
  }

  public remove: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      await removeUser(id);
      res.status(200).json({ msg: 'Usuário removido com sucesso.' });
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

public login: RequestHandler = async (req, res) => {
    if (req.method === 'GET') {
      res.render('auth/login', { title: "Login" });
    } else if (req.method === 'POST') {
      try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.render('auth/login', { error: 'Email ou senha inválidos.', oldInput: req.body, title: "Login" });
        }


        req.session.uid = user.id;
        req.session.userFullname = user.fullname;

        const redirectTo = req.session.returnTo || '/';
        delete req.session.returnTo;

        req.session.save((err) => {
          if (err) {
            console.error('Erro ao salvar a sessão:', err);
            return res.status(500).render('errors/500');
          }
          res.redirect(redirectTo);
        });


      } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).render('errors/500');
      }
    }
  }

  public logout: RequestHandler = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Erro ao destruir sessão:', err);
      }
      res.redirect('/');
    });
  }

 public changePassword: RequestHandler = async (req, res) => {
    if (req.method === 'GET') {
      return res.render('auth/changePassword', { title: "Alterar Senha" });
    }

    try {
        const userId = req.session.uid;
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        if (!userId) {
            return res.redirect('/users/login');
        }

        if (newPassword !== confirmNewPassword) {
            return res.render('auth/changePassword', { error: 'As novas senhas não coincidem.', title: "Alterar Senha" });
        }

        const user = await getUserById(userId); 
        if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
            return res.render('auth/changePassword', { error: 'Senha atual incorreta.', title: "Alterar Senha" });
        }

        await updatePassword(userId, newPassword);
        
        res.render('auth/changePassword', { success: 'Senha alterada com sucesso!', title: "Alterar Senha" });

    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        res.status(500).render('errors/500');
    }
}
}

const userController = new UserController();
export default userController;