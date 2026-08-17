class Employee {
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