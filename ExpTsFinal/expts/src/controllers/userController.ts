import { Request, Response, RequestHandler } from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  removeUser,
  getUserByEmail,
  updatePassword
} from '../services/userService'; // Assuming the service file is named userService.ts
import { getMajors } from '../services/majorService'; // Assuming the service file is named majorService.ts
import bcrypt from 'bcryptjs';

class UserController {
  // --- Listar todos os usuários ---
  public index: RequestHandler = async (req, res) => {
    try {
      const users = await getAllUsers();
      res.render('users/index', { users, title: "Lista de Usuários" });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).render('errors/500', { title: "Erro no Servidor" });
    }
  }

  // --- Criar um novo usuário (GET para o formulário, POST para o envio) ---
  public  create: RequestHandler = async (req, res) => {
    if (req.method === 'GET') {
      try {
        // 1. BUSCA a lista de todos os cursos do banco de dados.
        const majors = await getMajors();
        
        
        // 2. PASSA a lista de 'majors' para a view.
        res.render('users/create', { majors, title: "Criar Nova Conta" });
      } catch (error) {
        console.error('Erro ao carregar formulário de criação de usuário:', error);
        res.status(500).send('Erro interno do servidor.');
      }
    } else if (req.method === 'POST') {
      try {
        const userData = req.body;

        // Validação básica
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
        res.redirect('/users/login'); // Redireciona para o login após o sucesso
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).render('errors/500');
      }
    }
  }

  // --- Ler os detalhes de um usuário ---
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

  // --- Atualizar um usuário ---
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

  // --- Remover um usuário ---
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

  // --- Login do usuário ---
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

        // --- INÍCIO DA CORREÇÃO ---

        // 1. Define os dados da sessão como antes
        req.session.uid = user.id;
        req.session.userFullname = user.fullname;

        const redirectTo = req.session.returnTo || '/';
        delete req.session.returnTo;

        // 2. Força o salvamento da sessão ANTES de redirecionar
        req.session.save((err) => {
          if (err) {
            // Se houver um erro ao salvar, registre e envie um erro
            console.error('Erro ao salvar a sessão:', err);
            return res.status(500).render('errors/500');
          }
          // 3. Apenas após o salvamento ser bem-sucedido, redireciona o usuário
          res.redirect(redirectTo);
        });

        // --- FIM DA CORREÇÃO ---

      } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).render('errors/500');
      }
    }
  }

  // --- Logout do usuário ---
  public logout: RequestHandler = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Erro ao destruir sessão:', err);
      }
      res.redirect('/');
    });
  }

  // --- Alterar senha do usuário ---
 public changePassword: RequestHandler = async (req, res) => {
    // Lógica para mostrar o formulário (GET)
    if (req.method === 'GET') {
      return res.render('auth/changePassword', { title: "Alterar Senha" });
    }

    // Lógica para processar o formulário (POST)
    try {
        // Pega o ID do usuário DA SESSÃO. Este é o passo crucial.
        const userId = req.session.uid;
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        // Se por algum motivo não houver ID na sessão, redireciona para o login.
        if (!userId) {
            return res.redirect('/users/login');
        }

        // Validação 1: Nova senha e confirmação devem ser iguais.
        if (newPassword !== confirmNewPassword) {
            return res.render('auth/changePassword', { error: 'As novas senhas não coincidem.', title: "Alterar Senha" });
        }

        // Validação 2: A senha atual deve estar correta.
        const user = await getUserById(userId); // Busca o usuário no banco
        if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
            return res.render('auth/changePassword', { error: 'Senha atual incorreta.', title: "Alterar Senha" });
        }

        // Se tudo estiver certo, atualiza a senha no banco.
        await updatePassword(userId, newPassword);
        
        // Renderiza a página novamente com uma mensagem de sucesso.
        res.render('auth/changePassword', { success: 'Senha alterada com sucesso!', title: "Alterar Senha" });

    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        res.status(500).render('errors/500');
    }
}
}

const userController = new UserController();
export default userController;