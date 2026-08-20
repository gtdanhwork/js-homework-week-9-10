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
		this.totalSalary = calcSalary(data.luongCB, data.chucvu);
		this.rate = evaluateRate(data.gioLam);
	}
}
