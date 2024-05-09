document.addEventListener('DOMContentLoaded', function () {
    const usersContainer = document.getElementById('usersContainer');
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserModal = document.getElementById('addUserModal');
    const closeModalBtn = document.querySelector('.close');
    const addUserForm = document.getElementById('addUserForm');
    const editUserModal = document.getElementById('editUserModal');
    const editUserForm = document.getElementById('editUserForm');

    // Hiển thị danh sách người dùng khi trang được tải
    fetchUsers();

    // Thêm sự kiện click cho nút "Add User" để mở modal
    addUserBtn.addEventListener('click', function () {
        addUserModal.style.display = 'block';
    });

    // Thêm sự kiện click cho nút đóng modal
    closeModalBtn.addEventListener('click', function () {
        addUserModal.style.display = 'none';
    });

    // Thêm sự kiện submit cho form chỉnh sửa
    editUserForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn việc gửi form mặc định

        // Lấy thông tin người dùng đã chỉnh sửa từ form
        const formData = new FormData(editUserForm);
        const editedUserData = {
            id: formData.get('id'),
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        // Gửi yêu cầu cập nhật thông tin người dùng đến máy chủ
        updateUser(editedUserData);
    });

    // Thêm sự kiện xử lý cho nút "Edit"
    function editUser(userId) {
        // Lấy thông tin người dùng từ hàng bảng
        const userRow = document.getElementById(`userRow_${userId}`);
        const userData = {
            id: userId,
            username: userRow.cells[1].textContent, // Lấy tên người dùng từ ô thứ 2
            email: userRow.cells[2].textContent, // Lấy email từ ô thứ 3
            password: userRow.cells[3].textContent // Lấy mật khẩu từ ô thứ 4
        };

        // Điền thông tin người dùng vào form chỉnh sửa
        document.getElementById('editUserId').value = userData.id;
        document.getElementById('editUsername').value = userData.username;
        document.getElementById('editEmail').value = userData.email;
        document.getElementById('editPassword').value = userData.password;

        // Hiển thị modal chỉnh sửa
        editUserModal.style.display = 'block';
    }

    // Thêm sự kiện xử lý cho nút "Delete"
    function deleteUser(userId) {
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('User deleted:', data);
                // Xóa hàng của người dùng trong bảng
                const deletedRow = document.getElementById(`userRow_${userId}`);
                if (deletedRow) {
                    deletedRow.remove();
                }
            })
            .catch(error => console.error('Error deleting user:', error));
    }

    // Hàm để cập nhật thông tin người dùng thông qua Web API
    function updateUser(userData) {
        fetch(`http://localhost:3000/users/${userData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(updatedUser => {
                console.log('User updated:', updatedUser);
                editUserModal.style.display = 'none'; // Đóng modal sau khi chỉnh sửa thành công
                fetchUsers(); // Lấy danh sách người dùng mới
            })
            .catch(error => console.error('Error updating user:', error));
    }

    // Hàm để lấy danh sách người dùng từ Web API
    function fetchUsers() {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                usersContainer.innerHTML = ''; // Xóa nội dung cũ
                users.forEach(user => {
                    const userRow = createUserRow(user);
                    usersContainer.appendChild(userRow);
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    // Hàm tạo một hàng trong bảng cho một người dùng
    function createUserRow(user) {
        const row = document.createElement('tr');
        row.id = `userRow_${user.id}`; // Đặt ID cho hàng của người dùng

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.createdAt}</td>
            <td>${user.updatedAt}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        return row;
    }
});
