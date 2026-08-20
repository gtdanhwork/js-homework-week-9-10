/**
 * TODO: Thêm Nhân viên (Employee)
 */

let employees = employeeData.getLocalEmployeeData();

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

	let employee = new Employee(data);

	employeeData.addEmployeeData(employee);

	displayEmployees(employeeData);

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

	formValidation(data);

	if (!formValidation(data)) return;

	let index = employeeData.getEmployeeIndex(data.tknv);

	employeeData.updateEmployeeData(data, index);

	displayEmployees(employeeData);

	document.querySelector('#btnDong').click();
}

document.querySelector('#btnCapNhat').onclick = updateEmployee;

function deleteEmployee(user) {
	employeeData.deleteEmployeeData(user);
	displayEmployees(employeeData);
}

let timeoutId;
document.querySelector('#searchName').addEventListener('input', (e) => {
	clearTimeout(timeoutId);

	timeoutId = setTimeout(() => {
		let result = employeeData.searchEmployee(e.target.value);
		// displayEmployees(result);
	}, 2000);
});

console.log(employeeData);

// Refer to /views/displayEmployees.js
displayEmployees(employees);
