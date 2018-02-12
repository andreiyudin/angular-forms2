import * as solver from 'javascript-lp-solver';


export class LSSolver {

    constructor() {
        this.solve();
    }

    solve() {

        var model = [
            "max: 4 x11 0 x12 0 x13 1 x14 4 x21 0 x22 0 x23 3 x24 2 x31 1 x32 3 x33 4 x34 2 x41 3 x42 4 x43 1 x44 1 x51 2 x52 4 x53 3 x54  ",
            "x11 >= 0",
            "x12 = 0",
            "x13 = 0",
            "x14 >= 0",
            "x21 >= 0",
            "x22 = 0",
            "x23 = 0",
            "x24 >= 0",
            "x31 >= 0",
            "x32 >= 0",
            "x33 >= 0",
            "x34 >= 0",
            "x41 >= 0",
            "x42 >= 0",
            "x43 >= 0",
            "x44 >= 0",
            "x51 >= 0",
            "x52 >= 0",
            "x53 >= 0",
            "x54 >= 0",
            "x11 x12 x13 x14 = 800",
            "x21 x22 x23 x24 = 840",
            "x31 x32 x33 x34 = 1484",
            "x41 x42 x43 x44 = 444",
            "x51 x52 x53 x54 = 532",
            "x11 x21 x31 x41 x51 = 1025",
            "x12 x22 x32 x42 x52 = 1025",
            "x13 x23 x33 x43 x53 = 1025",
            "x14 x24 x34 x44 x54 = 1025",
            "int x11",
            "int x12",
            "int x13",
            "int x14",
            "int x21",
            "int x22",
            "int x23",
            "int x24",
            "int x31",
            "int x32",
            "int x33",
            "int x34",
            "int x41",
            "int x42",
            "int x43",
            "int x44",
            "int x51",
            "int x52",
            "int x53",
            "int x54",
        ];

        // Reformat to JSON model               
        model = solver.ReformatLP(model);

        // Solve the model 
        console.log(solver.Solve(model));

    }

}

