// TODO: Modal
class EmployeeData {
	#employees;
	constructor() {
		this.#employees = this.getLocalEmployeeData();
	}

	getLocalEmployeeData() {
		if (localStorage.getItem('Employees') != null) {
			return JSON.parse(localStorage.getItem('Employees'));
		}
		return [];
	}

	#updateLocalEmployeeData(employee) {
		localStorage.setItem('Employees', employee);
	}

	addEmployeeData(employee) {
		this.#employees.push(employee);
		this.#updateLocalEmployeeData(JSON.stringify(this.#employees));
	}

	deleteEmployeeData(employee) {}

	editEmployeeData(employee) {}

	searchEmployee(query) {}
}

let employeeData = new EmployeeData();

class Employees {
	constructor(data) {
		this.user = data.tknv;
		this.fullName = data.name;
		this.email = data.email;
		this.password = data.password;
		this.workDate = data.datepicker;
		this.baseSalary = data.luongCB;
		this.position = data.chucvu;
		this.workHours = data.gioLam;
		this.totalSalary = this.#calcSalary(data.luongCB, data.chucvu);
		this.rate = this.#evaluateRate(data.gioLam);
	}

	#calcSalary(salary, position) {
		switch (position) {
			case 'Sếp':
				return salary * 3;
			case 'Trưởng Phòng':
				return salary * 2;
			default:
				return salary * 1;
		}
	}

	#evaluateRate(workHours) {
		switch (true) {
			case workHours < 160:
				return 'Trung bình';
			case workHours < 176:
				return 'Khá';
			case workHours < 192:
				return 'Giỏi';
			default:
				return 'Xuất sắc';
		}
	}
}

// TODO: Validate
function formValidation(data) {
	let invalidCount = 0;

	let tknv = document.querySelector('#tknv').value;
	let tbTKNV = document.getElementById('tbTKNV');
	const usernameRegex = /^[a-zA-Z0-9]{4,10}$/;

	if (!usernameRegex.test(tknv)) {
		tbTKNV.style.display = 'revert';
		tbTKNV.innerHTML = 'Tài khoản tối đa 4 - 6 ký tự, không để trống';
		invalidCount++;
	} else {
		tbTKNV.style.display = '';
	}

	let name = document.querySelector('#name').value;
	let tbTen = document.getElementById('tbTen');

	// Regex rule for name: Kiểm tra tên không thuộc ([^) chữ cái, kiểu thường (a-z) và in hoa (A-Z), và cho phép khoảng trắng (\s)
	const textOnlyRegex = /[^a-zA-Z\s]/;

	if (textOnlyRegex.test(name) || name.length == 0) {
		tbTen.style.display = 'revert';
		tbTen.innerHTML = 'Tên nhân viên phải là chữ, không để trống';
		invalidCount++;
	} else {
		tbTen.style.display = '';
	}

	let email = document.querySelector('#email').value;
	let tbEmail = document.getElementById('tbEmail');
	/**
	 * Regex rules for email:
	 * ^ ... $ 			- Bắt đầu kiểm tra từ ký tự đầu đến ký tự cuối cùng
	 * [a-zA-Z0-9._%+-] - Bao gồm chữ cái (a-zA-z), số (0-9), và các ký tự cụ thể (.%+-)
	 * +@				- Bắt buộc có 1 ký tự trước dấu @, không được trống
	 * [a-zA-Z0-9._%+-] - Bao gồm chữ cái (a-zA-z), số (0-9), và các ký tự cụ thể (-)
	 * +\.[a-zA-Z]		- Bắt buộc có 1 ký tự trước đuôi email, phải có dấu chấm và chữ cái theo sau
	 * {2,}				- Tối thiểu từ 2 ký tự trở lên
	 */
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(email)) {
		tbEmail.style.display = 'revert';
		tbEmail.innerHTML = 'Email phải đúng định dạng, không để trống';
		invalidCount++;
	} else {
		tbEmail.style.display = '';
	}

	let password = document.querySelector('#password').value;
	let tbMatKhau = document.getElementById('tbMatKhau');
	/**
	 * Regex rules for Password
	 * (?=.*[a-z]) 			- Tối thiểu 1 chữ cái thường
	 * (?=.*[A-Z]) 			- Tối thiểu 1 chữ cái in hoa
	 * (?=.*\d)	   			- Tối thiểu 1 chữ số
	 * (?=.*[@$!%*#?&]) 	- Tối thiểu 1 ký tự đặc biệt trong khuôn
	 * [A-Za-z\d@$!%*#?&]	- Bao gồm các chữ cái thường, in hoa, số, và ký tự đặc biệt
	 * {6,10}				- Giới hạn từ 6 đến 10 ký tự
	 */
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/;

	if (!passwordRegex.test(password)) {
		tbMatKhau.style.display = 'revert';
		tbMatKhau.innerHTML =
			'Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống';
		invalidCount++;
	} else {
		tbMatKhau.style.display = '';
	}

	let datepicker = document.querySelector('#datepicker').value;
	let tbNgay = document.getElementById('tbNgay');

	const tempDate = new Date(datepicker);
	if (isNaN(tempDate) || datepicker.length < 8) {
		tbNgay.style.display = 'revert';
		tbNgay.innerHTML = 'Email phải đúng định dạng, không để trống';
		invalidCount++;
	} else {
		tbNgay.style.display = '';
	}

	let luongCB = Number(document.querySelector('#luongCB').value);
	let tbLuongCB = document.getElementById('tbLuongCB');

	if (luongCB < 1000000 || luongCB > 20000000) {
		tbLuongCB.style.display = 'revert';
		tbLuongCB.innerHTML =
			'Lương cơ bản 1 000 000 - 20 000 000, không để trống';
		invalidCount++;
	} else {
		tbLuongCB.style.display = '';
		tbLuongCB.innerHTML = '';
	}

	let chucvu = document.querySelector('#chucvu').value;
	let tbChucVu = document.getElementById('tbChucVu');
	if (chucvu == '') {
		tbChucVu.style.display = 'revert';
		tbChucVu.innerHTML = 'Chức vụ không được để trống';
		invalidCount++;
	} else {
		tbChucVu.style.display = '';
	}

	let gioLam = Number(document.querySelector('#gioLam').value);
	let tbGiolam = document.getElementById('tbGiolam');
	if (gioLam < 80 || gioLam > 200) {
		tbGiolam.style.display = 'revert';
		tbGiolam.innerHTML =
			'Số giờ làm trong tháng 80 - 200 giờ, không để trống';
		invalidCount++;
	} else {
		tbGiolam.style.display = '';
	}

	// End Function if at least 1 invalid field value
	if (invalidCount > 0) {
		return false;
	}

	return true;
}

// TODO: Controllers
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
                    <a>
                        <i class="fa fa-pencil"></i>
					</a>                    
                </td>
            </tr>
        `;
		})
		.join('');
}

displayEmployees();

document.querySelector('#btnThemNV').onclick = addEmployee;
