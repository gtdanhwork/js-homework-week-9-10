/**
 * Global Scopes
 */

let username = '';
let fullname = '';
let password = '';
let birthday = '';
let salary = '';
let worktime = '';
let position = '';

function addEmployee() {
	document;
}

function validateUser() {
	let tempUser = document.querySelector('#tknv').value;
	if (tempUser.length >= 4 && tempUser.length <= 6) {
		document.querySelector('#tbTKNV').innerHTML =
			'Tài khoản tối đa 4 - 6 ký số, không để trống';
	}
}
function validateFullName() {}
function validatePassword() {}
function validateBirthday() {}
function validateSalary() {}
function validateWorkTime() {}
function validatePosition() {}

document.querySelector('#tknv').onblur = validateUser;
document.querySelector('#btnThem').onclick = addEmployee;
