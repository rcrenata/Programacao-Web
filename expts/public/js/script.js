function removeMajor(id){
    fetch(`/majors/remove/${id}`, {
        method: 'POST'   }).then(response =>{
            if(response.ok){
                console.log('curso removido com sucesso');
                window.location.reload();
            } else{
                console.log('erro ao remover curso');
                console.log(response.status);
            }
        })
}

function removeUser(id) {

    fetch(`/users/remove/${id}`, {
        method: 'POST'
    })
    .then(response => {

        if (response.ok) {

            window.location.reload();
        } else {
            alert('Ocorreu um erro ao tentar deletar o usuário.');
        }
    })
    .catch(error => {
        console.error('Erro na requisição fetch:', error);
        alert('Erro de conexão.');
    });
}