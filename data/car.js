class Car {
    #brand;
    #model;
    #speed = 0;
    isTrunkOpen = false;

    trackIsCarRunning = false;
    trackTrunkOpen = false;

    messege = '';

    constructor(carDetils) {
        this.#brand = carDetils.brand;
        this.#model = carDetils.model;
    };

    go() {
        if (this.trackTrunkOpen) {
            this.messege = 'The Car Trank Is Open';
        } else {
            this.#speed += 5;
            this.trackIsCarRunning = true;
        }
    };

    brake() {
        this.#speed -= 5;
    };

    openTrunk() {
        this.trackTrunkOpen = true;

        if (this.trackIsCarRunning) {
            this.messege = 'The Car Is Running so you can not open the trank';
        } else {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        isTrunkOpen = false;
    }

    displayInfo() {
        return this.#speed < 200 ? `${this.#brand} ${this.#model}, ${this.#speed} km/h${this.messege === '' ? '' : ','} ${this.messege}` : '';
    };
};

class RaceCar extends Car {
    acceleraton;
    #brand;
    #model;

    #speed = 0;
    
    constructor(carDetils) {
        super(carDetils);
        this.acceleraton = carDetils.acceleraton;
        this.#brand = carDetils.brand;
        this.#model = carDetils.model;
    }

    go() {
        this.acceleraton += 300 - 20;
        this.#speed += this.acceleraton;
    };

    openTrunk() {}

    closeTrunk() {}

    displayInfo() {
        return `${this.#brand} ${this.#model}, ${this.#speed} km/h`;
    }
    
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});

const car2 = new Car({brand: 'Tesla', model: 'Model 3'});

const raceCar = new RaceCar({brand: 'McLaren', model: 'F1', acceleraton: 20});

// car1.go();
// car1.go();
// car1.brake();
// car1.go();

// car1.openTrunk();
// car1.go();
car1.openTrunk();
car1.go();
console.log(car1.displayInfo());

car2.go();
car2.brake();
car2.go();
console.log(car2.displayInfo());

raceCar.go();
console.log(raceCar.displayInfo());