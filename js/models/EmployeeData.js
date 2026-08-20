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

	getEmployee(user) {
		const index = this.#employees.findIndex((employee) => {
			return employee.user === user;
		});

		return this.#employees[index];
	}

	getEmployeeIndex(user) {
		return this.#employees.findIndex((employee) => {
			return employee.user === user;
		});
	}

	#updateLocalEmployeeData(employees) {
		localStorage.setItem('Employees', JSON.stringify(employees));
	}

	updateEmployeeData(employee, index) {
		let tempEmployee = this.#employees[index];

		console.log(tempEmployee);

		tempEmployee.user = employee.tknv;
		tempEmployee.fullName = employee.name;
		tempEmployee.email = employee.email;
		tempEmployee.password = employee.password;
		tempEmployee.workDate = employee.datepicker;
		tempEmployee.baseSalary = employee.luongCB;
		tempEmployee.position = employee.chucvu;
		tempEmployee.workHours = employee.gioLam;
		tempEmployee.totalSalary = calcSalary(
			employee.luongCB,
			employee.chucvu,
		);
		tempEmployee.rate = evaluateRate(employee.gioLam);

		console.log(tempEmployee);

		this.#employees[index] = tempEmployee;
		this.#updateLocalEmployeeData(this.#employees);
	}

	addEmployeeData(employee) {
		this.#employees.push(employee);
		this.#updateLocalEmployeeData(this.#employees);
	}

	deleteEmployeeData(employee) {
		let index = this.getEmployeeIndex(employee.user);
		this.#employees.splice(index, 1);
		this.#updateLocalEmployeeData(this.#employees);
	}

	searchEmployee(query) {
		console.log(query);
		let temp = this.#employees.filter((employee) => {
			employee.fullName.includes(query);
		});
		console.log(temp);
		return temp;
	}
}

let employeeData = new EmployeeData();
