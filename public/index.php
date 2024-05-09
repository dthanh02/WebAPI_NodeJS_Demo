<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Information</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div id="addUserModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Add New User</h2>
    <form id="addUserForm">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br><br>
      <button type="submit">Add User</button>
    </form>
  </div>
</div>


<!-- Modal chỉnh sửa -->
<div id="editUserModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Edit User</h2>
        <form id="editUserForm">
            <input type="hidden" id="editUserId" name="id">
            <label for="editUsername">Username:</label>
            <input type="text" id="editUsername" name="username" required><br><br>
            <label for="editEmail">Email:</label>
            <input type="email" id="editEmail" name="email" required><br><br>
            <label for="editPassword">Password:</label>
            <input type="password" id="editPassword" name="password" required><br><br>
            <button type="submit">Save Changes</button>
        </form>
    </div>
</div>


    <div class="container">
        <h2>User Information</h2>
        <div class="table-scroll">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Kết nối đến cơ sở dữ liệu
                    $conn = mysqli_connect("localhost", "root", "", "usertest");


                    // Kiểm tra kết nối
                    if ($conn === false) {
                        die("ERROR: Could not connect. " . mysqli_connect_error());
                    }

                    // Truy vấn dữ liệu từ cơ sở dữ liệu
                    $sql = "SELECT * FROM users";
                    $result = mysqli_query($conn, $sql);

                    // Hiển thị dữ liệu trong bảng HTML
                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo "<tr>";
                            echo "<td>" . $row['id'] . "</td>";
                            echo "<td>" . $row['username'] . "</td>";
                            echo "<td>" . $row['email'] . "</td>";
                            echo "<td>" . $row['password'] . "</td>";
                            echo "<td>" . $row['createdAt'] . "</td>";
                            echo "<td>" . $row['updatedAt'] . "</td>";
                            echo "<td>";
                            echo "<button class='edit-btn'>Edit</button>";
                            echo "<button class='delete-btn'>Delete</button>";
                            echo "</td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='7'>No users found</td></tr>";
                    }

                    // Đóng kết nối
                    mysqli_close($conn);
                    ?>
                </tbody>
            </table>
        </div>
        <button class="add-btn" id="addUserBtn">Add User</button>

    </div>


    <script src="script.js"></script>
</body>
</html>
