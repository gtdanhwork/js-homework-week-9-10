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

		console.log(this.#employees[index]);

		return this.#employees[index];
	}

	getEmployeeIndex(user) {
		return this.#employees.findIndex((employee) => {
			return employee.user === user;
		});
	}

	#updateLocalEmployeeData(employee) {
		localStorage.setItem('Employees', employee);
	}

	updateEmployeeData(employee, index) {
		
	}

	addEmployeeData(employee) {
		this.#employees.push(employee);
		this.#updateLocalEmployeeData(JSON.stringify(this.#employees));
	}

	deleteEmployeeData(employee) {}

	updateEmployeeData(user) {
		let index = this.getEmployee(user);
		if (index !== -1) {
			return this.#employees[index];
		}
		console.log('Error, user not found.');
	}

	searchEmployee(query) {}
}

let employeeData = new EmployeeData();
