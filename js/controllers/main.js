/**
 * TODO: Thêm Nhân viên (Employee)
 */

function resetAddEmployeeForm() {
	document.querySelector('#formEmployee').reset();
	document.querySelector('#btnCapNhat').style.display = 'none';
	document.querySelector('#btnThemNV').style.display = '';
}

document
	.querySelector('#btnThem')
	.addEventListener('click', resetAddEmployeeForm);

function addEmployee() {
	let data = {
		tknv: document.querySelector('#tknv').value,
		name: document.querySelector('#name').value,
		email: document.querySelector('#email').value,
		password: document.querySelector('#password').value,
		datepicker: document.querySelector('#datepicker').value,
		luongCB: Number(document.querySelector('#luongCB').value),
		chucvu: document.querySelector('#chucvu').value,
		gioLam: Number(document.querySelector('#gioLam').value),
	};

	let isInvalid = formValidation(data);
	if (!isInvalid) return;

	let employee = new Employees(data);

	employeeData.addEmployeeData(employee);

	displayEmployees();

	document.querySelector('#btnDong').click();
}

document.querySelector('#btnThemNV').onclick = addEmployee;

/**
 * TODO: Cập nhật nhân viên
 */

function detailEmployee(user) {
	document.querySelector('#formEmployee').reset();
	document.querySelector('#btnCapNhat').style.display = '';
	document.querySelector('#btnThemNV').style.display = 'none';

	let employee = employeeData.getEmployee(user);
	console.log(employee);

	document.querySelector('#tknv').value = employee.user;
	document.querySelector('#name').value = employee.fullName;
	document.querySelector('#email').value = employee.email;
	document.querySelector('#password').value = employee.password;
	document.querySelector('#datepicker').value = employee.workDate;
	document.querySelector('#luongCB').value = employee.baseSalary;
	document.querySelector('#chucvu').value = employee.position;
	document.querySelector('#gioLam').value = employee.workHours;

	document.querySelector('#tknv').disabled = true;
}

function updateEmployee() {
	
}

document.querySelector('#btnCapNhat').onclick = updateEmployee;

function displayEmployees() {
	let tableDanhSach = document.querySelector('#tableDanhSach');
	let employees = employeeData.getLocalEmployeeData();
	console.log(employees);
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
                    <a id="btnDelete" onclick="">
                        <i class="fa fa-trash" aria-hidden="true"></i>
					</a>                   
                </td>
            </tr>
        `;
		})
		.join('');
}

displayEmployees();
