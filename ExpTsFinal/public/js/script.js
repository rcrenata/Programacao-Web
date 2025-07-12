// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const majorDeleteModalElement = document.getElementById('deleteConfirmationModal');
    if (majorDeleteModalElement) {
        const majorDeleteModal = new bootstrap.Modal(majorDeleteModalElement);
        const majorNameToDeleteSpan = document.getElementById('majorNameToDelete');
        const confirmMajorDeleteBtn = document.getElementById('confirmDeleteBtn');
        let currentMajorIdToDelete = null;

        document.querySelectorAll('.delete-major-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                currentMajorIdToDelete = event.target.dataset.id;
                majorNameToDeleteSpan.textContent = event.target.dataset.name;
                majorDeleteModal.show();
            });
        });

        confirmMajorDeleteBtn.addEventListener('click', async () => {
            if (currentMajorIdToDelete) {
                try {
                    const response = await fetch(`/majors/remove/${currentMajorIdToDelete}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const result = await response.json();
                        alert(result.msg);
                        window.location.reload(); 
                    } else {
                        const errorText = await response.text();
                        alert(`Erro ao deletar curso: ${errorText}`);
                    }
                } catch (error) {
                    console.error('Erro na requisição AJAX para deletar curso:', error);
                    alert('Erro ao comunicar com o servidor ao deletar curso.');
                } finally {
                    majorDeleteModal.hide();
                    currentMajorIdToDelete = null;
                }
            }
        });
    }

    const userDeleteModalElement = document.getElementById('deleteUserConfirmationModal');
    if (userDeleteModalElement) {
        const userDeleteModal = new bootstrap.Modal(userDeleteModalElement);
        const userFullNameToDeleteSpan = document.getElementById('userFullNameToDelete');
        const confirmUserDeleteBtn = document.getElementById('confirmUserDeleteBtn');
        let currentUserIdToDelete = null;

        document.querySelectorAll('.delete-user-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                currentUserIdToDelete = event.target.dataset.id;
                userFullNameToDeleteSpan.textContent = event.target.dataset.name;
                userDeleteModal.show();
            });
        });

        confirmUserDeleteBtn.addEventListener('click', async () => {
            if (currentUserIdToDelete) {
                try {
                    const response = await fetch(`/users/remove/${currentUserIdToDelete}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const result = await response.json();
                        alert(result.msg);
                        window.location.reload();
                    } else {
                        const errorText = await response.text();
                        alert(`Erro ao deletar usuário: ${errorText}`);
                    }
                } catch (error) {
                    console.error('Erro na requisição AJAX para deletar usuário:', error);
                    alert('Erro ao comunicar com o servidor ao deletar usuário.');
                } finally {
                    userDeleteModal.hide();
                    currentUserIdToDelete = null;
                }
            }
        });
    }

});