function displayEmployees(employees) {
	let tableDanhSach = document.querySelector('#tableDanhSach');
	tableDanhSach.innerHTML = employees
		.map((employee) => {
			return `
            <tr>
                <td>${employee.user}</td>
                <td>${employee.fullName}</td>
                <td>${employee.email}</td>
                <td>${employee.workDate}</td>
                <td>${employee.position}</td>
                <td>${employee.totalSalary}</td>
                <td>${employee.rate}</td>
                <td>
                    <a id="btnUpdate" onclick="detailEmployee('${employee.user}')" data-toggle="modal"data-target="#myModal">
                        <i class="fa fa-pencil"></i>
					</a>            
                    <a id="btnDelete" onclick="deleteEmployee('${employee.user}')">
                        <i class="fa fa-trash" aria-hidden="true"></i>
					</a>                   
                </td>
            </tr>
        `;
		})
		.join('');
}
