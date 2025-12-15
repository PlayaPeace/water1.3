'use strict';

let numBuildings;
let numSections;
let numFloors;
let floorHeight;
let population;
let numDevices;
let numApartments;
let lInput;
let hIlInput;
let hGInput;
let dInput;
//new part 25.11
let h2Input;
//new part 30.11
let nInput;


let h1;
let h2;

let hGeom;
let hSSum;
let hTr
let hL;
let qSMax1;

let Htr;
let Hnijt;

let U;
let Nb0;
let Nb1;
let qb0;
let qb1;
let Psb0;
let Psb1;
let NP1;
let NP2;
let qb0s;
let qb1s;
let NP3;
let NP4;
let Phb0;
let Phb1;
let qb0h;
let qb1h;

let formulaHtrResult;
let formulaHnijtResult;
let hiddenFormulaCont;
let formulaCont;
let canvasCont;

let sumHtr = document.querySelector('[data-sum-Htr]');

let inputs = document.querySelectorAll('input');
for (let elem = 0; elem < inputs.length; elem++){
    inputs[elem].addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {

            if (this.hasAttribute('data-num-buildings')) {
                numBuildings = this.value;
                allValue('[data-num-buildings]', numBuildings);

                //30.11 add
                let element = document.getElementById('data-num-buildings');
                if (element) element.textContent = numBuildings;
            }

            if (this.hasAttribute('data-num-sections')) {
                numSections = this.value;
                allValue('[data-num-sections]', numSections);

                //30.11 add
                let element = document.getElementById('data-num-sections');
                if (element) element.textContent = numSections;
            }

            if (this.hasAttribute('data-num-floors')) {
                numFloors = this.value;
                allValue('[data-num-floors]', numFloors);

                //30.11 add
                let element = document.getElementById('data-num-floors');
                if (element) element.textContent = numFloors;
            }

            if (this.hasAttribute('data-floor-height')) {
                floorHeight = this.value;
                allValue('[data-floor-height]', floorHeight);
            }

            if (this.hasAttribute('data-population')) {
                population = this.value;
                allValue('[data-population]', population);

                //30.11 add
                let element = document.getElementById('data-population');
                if (element) element.textContent = population;
            }

            if (this.hasAttribute('data-num-devices')) {
                numDevices = this.value;
                allValue('[data-num-devices]', numDevices);
            }

            if (this.hasAttribute('data-num-apartments')) {
                numApartments = this.value;
                allValue('[data-num-apartments]', numApartments);

                //30.11 add
                let element = document.getElementById('data-num-apartments');
                if (element) element.textContent = numApartments;
            }

            if (this.hasAttribute('data-l-input')) {
                lInput = this.value;
                allValue('[data-l-input]', lInput);

                let element = document.getElementById('l-text');
                if (element) element.textContent = lInput;
            }

            if (this.hasAttribute('data-hIl-input')) {
                hIlInput = this.value;
                allValue('[data-hIl-input]', hIlInput);

                let element = document.getElementById('h-il-input');
                if (element) element.textContent = hIlInput;
            }

            if (this.hasAttribute('data-hG-input')) {
                hGInput = this.value;
                allValue('[data-hG-input]', hGInput);

                let element = document.getElementById('h-g-text');
                if (element) element.textContent = hGInput;
            }

            if (this.hasAttribute('data-d-input')) {
                dInput = this.value;
                allValue('[data-d-input]', dInput);

                let element = document.getElementById('d-input-text');
                if (element) element.textContent = dInput;
            }

            //new part 30.11
            if (this.hasAttribute('data-n-input')) {
                nInput = this.value;
                allValue('[data-n-input]', nInput);

                let text = document.getElementById('n-input-table2');
                if (text) text.textContent = nInput;
            }

            //new part 25.11
            if (this.hasAttribute('data-h2-input')) {
                h2Input = this.value;
                allValue('[data-h2-input]', h2Input);

                let text = document.getElementById('h2-1');
                if (text) text.textContent = h2Input;

                text = document.getElementById('h2-2');
                if (text) text.textContent = h2Input;
            }

            //new part 25.11
            if (h2Input) {
                let h1 = h2Input - 0.3;
                h1 = Number(h1.toFixed(3));

                let text = document.getElementById('h1');
                if (text) text.textContent = h1;
            }

            if (numFloors) {
                Htr = 10+4*(numFloors-1);
                formulaHtrResult = `H_{\\text{тр}} = 10+4*(${numFloors}-1) = ${Htr} м (3.1)`;
                hiddenFormulaCont = 'hiddenFormulaHtr';
                formulaCont='formulaHtr';
                canvasCont='canvasHtr';
                calculate(formulaHtrResult, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (numFloors && floorHeight) {
                Hnijt = 2+floorHeight*(numFloors-1);
                Hnijt = Number(Hnijt.toFixed(1));
                formulaHnijtResult = `H_{\\text{ниж.т.}} = 2+${floorHeight}*(${numFloors}-1) = ${Hnijt} {\\text{м.вод.столба}}`;
                hiddenFormulaCont = 'hiddenFormulaHnijt';
                formulaCont='formulaHnijt';
                canvasCont='canvasHnijt';
                calculate(formulaHnijtResult, hiddenFormulaCont,formulaCont,canvasCont);

                hGeom = Number(numFloors) * Number(floorHeight) + 0.8;
                let element = document.getElementById('h-geom');
                if (element) element.textContent = Number(hGeom.toFixed(1));
            }

            if (numBuildings && numSections && numFloors && numApartments && population) {
                U = parseFloat(numBuildings) * parseFloat(numSections) * parseFloat(numFloors) * parseFloat(numApartments) * parseFloat(population);
                U = Number(U.toFixed(2));
                let uCalculate = numBuildings + " * " + numSections + " * " + numFloors + " * " + numApartments + " * " + population + " = " + U;
                allValue('[u-calculate]', uCalculate)
                U = Math.ceil(U);
                allValue('[u]', U.toString() + " чел")
                allValue('[u-3]', U.toString() + " чел. (количество водопотребителей)")

                qb0 = Number(180)*U/1000;
                qb0 = Number(qb0.toFixed(2)); //to fixed
                qb1 = Number(110)*U/1000;
                qb1 = Number(qb1.toFixed(2)); //to fixed
            }

            if (U && qb0) {

                let qB0mh = Number((qb0/24).toFixed(2));
                let formulaQB0mhText = `q^{\\text{B0}}_{\\text{ср час}} = \\frac{${qb0}}{24} = ${qB0mh} \\frac{\\text{м³}}{\\text{час}}`;
                hiddenFormulaCont = 'hiddenFormulaQB0mh';
                formulaCont='formulaQB0mh';
                canvasCont='canvasQB0mh';
                calculate(formulaQB0mhText, hiddenFormulaCont,formulaCont,canvasCont);

                let formulaQb0Text = `q^{\\text{b0}}_{\\text{сут}} = \\frac{q^{\\text{B0}}_{\\text{сут}} * U}{1000} = \\frac{${180} * ${U}}{1000} = ${qb0} \\frac{\\text{м³}}{\\text{сут}}`;
                hiddenFormulaCont = 'hiddenFormulaQb0';
                formulaCont='formulaQb0';
                canvasCont='canvasQb0';
                calculate(formulaQb0Text, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb0mhTableElement = document.getElementById('Qb0mh-table');
                if (Qb0mhTableElement) Qb0mhTableElement.textContent = qB0mh.toString();
                allValue('Qb0mh-table', qB0mh);

                const tableElement = document.getElementById('Qb0mh-text');
                if (tableElement) tableElement.textContent = qB0mh.toString();
                allValue('Qb0mh-text', qB0mh);

                const Qb0dTableElement = document.getElementById('Qb0d-table');
                if (Qb0dTableElement) Qb0dTableElement.textContent = qb0;
                allValue('Qb0d-table', qb0);
            }

            if(U && qb1) {
                let formulaQb1Text = `q^{\\text{b1}}_{\\text{сут}} = \\frac{q^{\\text{B1}}_{\\text{сут}} * U}{1000} = \\frac{110 * ${U}}{1000} = ${qb1} \\frac{\\text{м³}}{\\text{сут}}`;
                hiddenFormulaCont = 'hiddenFormulaQb1';
                formulaCont='formulaQb1';
                canvasCont='canvasQb1';
                calculate(formulaQb1Text, hiddenFormulaCont,formulaCont,canvasCont);

                let qB1mh = Number((qb1/24).toFixed(2));
                let formulaQB1mhText = `q^{\\text{B1}}_{\\text{ср час}} = \\frac{${qb1}}{24} = ${qB1mh} \\frac{\\text{м³}}{\\text{час}}`;
                hiddenFormulaCont = 'hiddenFormulaQB1mh';
                formulaCont='formulaQB1mh';
                canvasCont='canvasQB1mh';
                calculate(formulaQB1mhText, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb1mhTableElement = document.getElementById('Qb1mh-table');
                if (Qb1mhTableElement) Qb1mhTableElement.textContent = qB1mh.toString();
                allValue('Qb1mh-table', qB1mh);

                const Qb1dTableElement = document.getElementById('Qb1d-table');
                if (Qb1dTableElement) Qb1dTableElement.textContent = qb1;
                allValue('Qb1d-table', qb1);
            }

            if (numSections && numFloors && numDevices && numApartments && numBuildings) {
                Nb0 = parseFloat(numSections) * parseFloat(numFloors) * parseFloat(numDevices) * parseFloat(numApartments) * parseFloat(numBuildings);
                Nb0 = Math.ceil(Nb0)
                Nb1 = parseFloat(numSections) * parseFloat(numFloors) * parseFloat(numDevices) * parseFloat(numApartments) * parseFloat(numBuildings);
                Nb1 = Math.ceil(Nb1)
                let Nb0Calculate = numSections + " * " + numFloors + " * " + numDevices + " * " + numApartments + " * " + numBuildings + " = " + Nb0;
                let Nb1Calculate = numSections + " * " + numFloors + " * " + numDevices + " * " + numApartments + " * " + numBuildings + " = " + Nb1;
                allValue('[Nb0-calculate]', Nb0Calculate + " шт")
                allValue('[Nb1-calculate]', Nb1Calculate + " шт")
            }

            if (U && Nb0) {
                Psb0 = (11.6*U)/(3600*Nb0*0.3);
                Psb0 = Number(Psb0.toFixed(6));
                let Pb0Calculate = "(11.6 * " + U + `)/(3600*${Nb0}*0.3) = ` + Psb0;
                allValue('[Pb0-calculate]', Pb0Calculate);

                //new part 30.11
                let text = document.getElementById('pSB0-table2');
                if (text) text.textContent = Psb0;

                let formulaPB0sText = `\\text{1)} P_{\\text{сек}}^{\\text{BO}} = \\frac{11.6 * ${U}}{3600*${Nb0}*0.3} = ${Psb0}`;
                hiddenFormulaCont = 'hiddenFormulaPB0s';
                formulaCont='formulaPB0s';
                canvasCont='canvasPB0s';
                calculate(formulaPB0sText, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (U && Nb1) {
                Psb1 = (5.1*U)/(3600*Nb1*0.2);
                Psb1 = Number(Psb1.toFixed(6));
                let Pb1Calculate = "(5.1 * " + U + ")/(3600*${Nb1}*0.2) = " + Psb1;
                allValue('[Pb1-calculate]', Pb1Calculate);

                let formulaPB1sText = `\\text{2)} P_{\\text{сек}}^{\\text{B1}} = \\frac{5.1 * ${U}}{3600*${Nb1}*0.2} = ${Psb1}`;
                hiddenFormulaCont = 'hiddenFormulaPB1s';
                formulaCont='formulaPB1s';
                canvasCont='canvasPB1s';
                calculate(formulaPB1sText, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (Nb0 && Psb0) {
                //NP0 = Number((Nb0 * Number(Pb0.toFixed(1))).toFixed(3));
                NP1 = Number((Nb0 * Psb0).toFixed(3));
                allValue('[NP0-calculate]', NP1)

                let formulaA1NPText = `\\text{α(N}\\text{P}_с^\\text{B0}\\text{)} = α(${Nb0} * ${Psb0}) = α(${NP1})`;
                hiddenFormulaCont = 'hiddenFormulaA1NP';
                formulaCont='formulaA1NP';
                canvasCont='canvasA1NP';
                calculate(formulaA1NPText, hiddenFormulaCont,formulaCont,canvasCont);

                //new part 25.11
                let text = document.getElementById('P-s-B0-1');
                if (text) text.textContent = Psb0;

                text = document.getElementById('P-s-B0-2');
                if (text) text.textContent = Psb0;

                text = document.getElementById('N-B0');
                if (text) text.textContent = Nb0;

                text = document.getElementById('NP');
                if (text) text.textContent = NP1;
            }

            if (NP1) {
                let a = findAlphaByNP(NP1);
                a = Number(a.toFixed(3));
                allValue('[a1-calculate]', a);
                qb0s = Number((5*a*0.3).toFixed(4));
                let qb0sCalculate = "5 * " + a + " * 0.3 = " + qb0s + " л/с";
                allValue('[qb0s-calculate]', qb0sCalculate);

                let formulaQsB0Text = `q_{\\text{сек}}^{\\text{B0}} = 5 * ${a} * 0.3 = ${qb0s} \\frac{\\text{л}}{\\text{с}}`;
                hiddenFormulaCont = 'hiddenFormulaQsB0';
                formulaCont='formulaQsB0';
                canvasCont='canvasQsB0';
                calculate(formulaQsB0Text, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb0maxsTableElement = document.getElementById('Qb0maxs-table');
                if (Qb0maxsTableElement) Qb0maxsTableElement.textContent = qb0s;
                allValue('Qb0maxs-table', qb0s);

                let element = document.getElementById('Qb0maxs-2');
                if (element) element.textContent = qb0s;

                element = document.getElementById('Qb0maxs-3');
                if (element) element.textContent = qb0s;

                //значение в скобках рядом с qb0s
                const b = Number((qb0s * 3.6).toFixed(3));
                element = document.getElementById('Qb0maxs-b');
                if (element) element.textContent = b;

                // hvv
                let result = findDQS(Number(qb0s));
                let resultText = result.s + " * " + qb0s + "² = " + Number((Number(qb0s)**2 * result.s).toFixed(2));
                h2 = Number((Number(qb0s)**2 * result.s).toFixed(2));

                let text = document.getElementById('h2-text');
                if (text) text.textContent = h2;

                const Qb0maxsText = document.getElementById('hvv-text');
                if (Qb0maxsText) Qb0maxsText.textContent = resultText;

                //блок проверки
                if (result.firstD !== result.d) {
                    let textParams = "Выполняем проверку водосчетчика: при d = " + result.firstD + " мм. S = " + result.firstS + " м/(л/с)²";
                    let text = document.getElementById('hvv-check-params');
                    if (text) text.textContent = textParams;

                    const hvvFirst = Number((Number(qb0s)**2 * result.firstS).toFixed(3));
                    let textCalculate = "h<sub>вод.</sub> = " + result.firstS + " * " + qb0s + "² = " + hvvFirst + " м. вод. ст, из этого следует, что потери напора выше допустимых, поэтому следует принять счетчик воды на один калибр больше.";
                    text = document.getElementById('hvv-check-calculate');
                    if (text) text.innerHTML = textCalculate;
                }

                let dText = document.getElementById('d-text');
                if (dText) dText.textContent = result.d;

                dText = document.getElementById('d-text1');
                if (dText) dText.textContent = result.d;

                const Qb0maxsElement = document.getElementById('Qb0maxs-1');
                if (Qb0maxsElement) Qb0maxsElement.textContent = qb0s;
                allValue('Qb0maxs-1', qb0s);

                const NP1Element = document.getElementById('NP1-result');
                if (NP1Element) NP1Element.textContent = NP1;

                //H_l^ввод
                if(dInput && lInput) {
                    result = findMatchingValues(qb0s, Number(dInput));
                    hL = Number((Number(lInput) * Number(result.i)).toFixed(3));
                    resultText = lInput + " * " + Number(result.i.toFixed(3)) + " = " + hL;

                    let text = document.getElementById('h-l-calculate');
                    if (text) text.textContent = resultText;

                    text = document.getElementById('h-l-text');
                    if (text) text.textContent = Number(result.i.toFixed(3));

                    text = document.getElementById('v-text');
                    if (text) text.textContent = Number(result.v.toFixed(3));

                    //new part 25.11
                    text = document.getElementById('a-1');
                    if (text) text.textContent = a;

                    text = document.getElementById('a-2');
                    if (text) text.textContent = a;

                    let qTot = 5 * 0.3 * a;
                    qTot = Number(qTot.toFixed(2));

                    text = document.getElementById('q-tot-1');
                    if (text) text.textContent = qTot;

                    text = document.getElementById('q-tot-2');
                    if (text) text.textContent = qTot;

                    let qS = Number(qTot) + 1.6;
                    qS = Number(qS.toFixed(2));
                    text = document.getElementById('q-s');
                    if (text) text.textContent = qS;
                }
            }

            if (Nb1 && Psb1) {
                NP2 = Number((Nb1 * Psb1).toFixed(3));
                allValue('[NP1-calculate]', NP2)

                let formulaA2NPText = `\\text{α(N}\\text{P}_с^\\text{B1}\\text{)} = α(${Nb1} * ${Psb1}) = α(${NP2})`;
                hiddenFormulaCont = 'hiddenFormulaA2NP';
                formulaCont='formulaA2NP';
                canvasCont='canvasA2NP';
                calculate(formulaA2NPText, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (NP2) {
                let a = findAlphaByNP(NP2);
                a = Number(a.toFixed(3));
                allValue('[a2-calculate]', a);
                qb1s = Number((5*a*0.2).toFixed(4));
                let qb1sCalculate = "5 * " + a + " * 0.2 = " + qb1s + " л/с";
                allValue('[qb1s-calculate]', qb1sCalculate);

                let formulaQsB1Text = `q_{\\text{сек}}^{\\text{B1}} = 5 * ${a} * 0.2 = ${qb1s} \\frac{\\text{л}}{\\text{с}}`;
                hiddenFormulaCont = 'hiddenFormulaQsB1';
                formulaCont='formulaQsB1';
                canvasCont='canvasQsB1';
                calculate(formulaQsB1Text, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb1maxsTableElement = document.getElementById('Qb1maxs-table');
                if (Qb1maxsTableElement) Qb1maxsTableElement.textContent = qb1s;
                allValue('Qb1maxs-table', qb1s);

                const NP2Element = document.getElementById('NP2-result');
                if (NP2Element) NP2Element.textContent = NP2;
            }

            if (Psb0) {
                Phb0 = (3600*0.3*Psb0)/300;
                Phb0 = Number(Phb0.toFixed(6));
                let Pb0Calculate = "(3600 * 0.3 * " + Psb0 + ")/300 = " + Phb0;
                allValue('[Phb0-calculate]', Pb0Calculate);

                let formulaPhb0Text = `\\text{1)} P_{\\text{ч}}^{\\text{BO}} = \\frac{3600 * 0.3 * ${Psb0}}{300} = ${Phb0}`;
                hiddenFormulaCont = 'hiddenFormulaPhB0';
                formulaCont='formulaPhB0';
                canvasCont='canvasPhB0';
                calculate(formulaPhb0Text, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (Phb0 && Nb0) {
                NP3 = Number((Nb0 * Phb0).toFixed(3));
                allValue('[NP3-calculate]', NP3)

                let formulaA3NPText = `\\text{α(N}\\text{P}_ч^\\text{B0}\\text{)} = α(${Nb0} * ${Phb0}) = α(${NP3})`;
                hiddenFormulaCont = 'hiddenFormulaA3NP';
                formulaCont='formulaA3NP';
                canvasCont='canvasA3NP';
                calculate(formulaA3NPText, hiddenFormulaCont,formulaCont,canvasCont);

                const Phb0Element = document.getElementById('Phb0-result');
                const Nb0Element = document.getElementById('Nb0-result');

                if (Phb0Element) Phb0Element.textContent = Phb0;
                if (Nb0Element) Nb0Element.textContent = Nb0;
            }

            if (NP3) {
                let a = findAlphaByNP(NP3);
                a = Number(a.toFixed(3));
                allValue('[a3-calculate]', a);
                qb0h = Number((0.005*a*300).toFixed(4));
                let qb0hCalculate = "0.005 * " + a + " * 300 = " + qb0h + " м³/час;";//³
                allValue('[qb0h-calculate]', qb0hCalculate);

                let formulaQhB0Text = `q_{\\text{ч}}^{\\text{B0}} = 0.005 * ${a} * 300 = ${qb0h} \\frac{\\text{м³}}{\\text{час}}`;
                hiddenFormulaCont = 'hiddenFormulaQhB0';
                formulaCont='formulaQhB0';
                canvasCont='canvasQhB0';
                calculate(formulaQhB0Text, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb0maxhTableElement = document.getElementById('Qb0maxh-table');
                if (Qb0maxhTableElement) Qb0maxhTableElement.textContent = qb0h;
                allValue('Qb0maxh-table', qb0h);

                // const Qb0maxhElement = document.getElementById('Qb0maxh-text');
                // if (Qb0maxhElement) Qb0maxhElement.textContent = qb0h;

                const NP3Element = document.getElementById('NP3-result');
                if (NP3Element) NP3Element.textContent = NP3;
            }

            if (Psb1) {
                Phb1 = (3600*0.2*Psb1)/200;
                Phb1 = Number(Phb1.toFixed(6));
                let Pb1Calculate = "(3600 * 0.2 * " + Psb1 + ")/200 = " + Phb1;
                allValue('[Phb1-calculate]', Pb1Calculate);

                let formulaPhb1Text = `\\text{2)} P_{\\text{ч}}^{\\text{B1}} = \\frac{3600 * 0.2 * ${Psb1}}{200} = ${Phb1}`;
                hiddenFormulaCont = 'hiddenFormulaPhB1';
                formulaCont='formulaPhB1';
                canvasCont='canvasPhB1';
                calculate(formulaPhb1Text, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (Phb1 && Nb1) {
                NP4 = Number((Nb1 * Phb1).toFixed(3));
                allValue('[NP4-calculate]', NP4)

                let formulaA4NPText = `\\text{α(N}\\text{P}_ч^\\text{B1}\\text{)} = α(${Nb1} * ${Phb1}) = α(${NP4})`;
                hiddenFormulaCont = 'hiddenFormulaA4NP';
                formulaCont='formulaA4NP';
                canvasCont='canvasA4NP';
                calculate(formulaA4NPText, hiddenFormulaCont,formulaCont,canvasCont);

                const Phb0Element = document.getElementById('Phb1-result');
                const Nb0Element = document.getElementById('Nb1-result');

                if (Phb0Element) Phb0Element.textContent = Phb0;
                if (Nb0Element) Nb0Element.textContent = Nb0;
            }

            if (NP4) {
                let a = findAlphaByNP(NP4);
                a = Number(a.toFixed(3));
                allValue('[a4-calculate]', a);
                qb1h = Number((0.005*a*200).toFixed(4));
                let qb1hCalculate = "0.005 * " + a + " * 200 = " + qb1h + " м³/час;";//³
                allValue('[qb1h-calculate]', qb1hCalculate);

                let formulaQhB1Text = `q_{\\text{ч}}^{\\text{B1}} = 0.005 * ${a} * 200 = ${qb1h} \\frac{\\text{м³}}{\\text{час}}`;
                hiddenFormulaCont = 'hiddenFormulaQhB1';
                formulaCont='formulaQhB1';
                canvasCont='canvasQhB1';
                calculate(formulaQhB1Text, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb1maxhTableElement = document.getElementById('Qb1maxh-table');
                if (Qb1maxhTableElement) Qb1maxhTableElement.textContent = qb1h;
                allValue('Qb1maxh-table', qb1h);

                const NP4Element = document.getElementById('NP4-result');
                if (NP4Element) NP4Element.textContent = NP4;
            }

            if (h1 && h2) {
                hSSum = Number((Number(h1) + Number(h2)).toFixed(3));
                let text = h1 + " + " + h2 + " = " + hSSum;
                const element = document.getElementById('hs-sum');
                if (element) element.textContent = text;
            }

            if (hGeom && hIlInput && h2 && hL) {
                hTr = Number(hGeom) + Number(hIlInput) + 20 + Number(h2) + Number(hL);
                hTr = Number(hTr.toFixed(2))
                let text = Number(hGeom.toFixed(1)) + " + " + hIlInput + " + 20 + " + h2 + " + " + Number(hL.toFixed(3)) + " = " + hTr;
                const element = document.getElementById('htr-sum-text');
                if (element) element.textContent = text;
            }

            if (hTr && hGInput) {
                let hP = Number(hTr) - Number(hGInput);
                hP = Number(hP.toFixed(2))
                let text = hTr + " - " + hGInput + " = " + hP;
                let element = document.getElementById('h-p-calculate');
                if (element) element.textContent = text;

                element = document.getElementById('h-p-text');
                if (element) element.textContent = hP;
            }

            if (nInput && Psb0) {
                let np = Number((nInput * Psb0).toFixed(3));
                let text = document.getElementById('np-table2');
                if (text) text.textContent = np;

                let a = findAlphaByNP(np);
                a = Number(a.toFixed(3))
                text = document.getElementById('a-table2');
                if (text) text.textContent = a;

                let qSB0 = Number((5 * 0.3 * a).toFixed(3));
                text = document.getElementById('qSB0-table2');
                if (text) text.textContent = qSB0;

                let qSK1 = Number((1.6 + qSB0).toFixed(3));
                text = document.getElementById('qSK1-table2');
                if (text) text.textContent = qSK1;
            }
        }
    });
}

//new part 25.11
let formulaText = `q^{\\text{sl}} = \\frac{q^{\\text{tot}}_{\\text{hr}}}{3.6} + k_s q^s_0, л/c.`;
hiddenFormulaCont = 'hiddenFormulaQsl';
formulaCont='formulaQsl';
canvasCont='canvasQsl';
calculate(formulaText, hiddenFormulaCont,formulaCont,canvasCont);
//

let formulaQdB0Text = `q_{\\text{сут}}^{\\text{B0}} = 180 \\frac{\\text{л}}{\\text{сут}}`;
hiddenFormulaCont = 'hiddenFormulaQdB0';
formulaCont='formulaQdB0';
canvasCont='canvasQdB0';
calculate(formulaQdB0Text, hiddenFormulaCont,formulaCont,canvasCont);

let formulaQdB1Text = `q_{\\text{сут}}^{\\text{B1}} = 110 \\frac{\\text{л}}{\\text{сут}}`;
hiddenFormulaCont = 'hiddenFormulaQdB1';
formulaCont='formulaQdB1';
canvasCont='canvasQdB1';
calculate(formulaQdB1Text, hiddenFormulaCont,formulaCont,canvasCont);

let formulaQdText = `q_{\\text{сут}} = \\frac{q_\\text{0 сут} * U}{1000}`;
hiddenFormulaCont = 'hiddenFormulaQd';
formulaCont='formulaQd';
canvasCont='canvasQd';
calculate(formulaQdText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaQmhText = `q_{\\text{ср час}} = \\frac{q_\\text{сут}}{T} \\text{ , (3.3)}`;
hiddenFormulaCont = 'hiddenFormulaQmh';
formulaCont='formulaQmh';
canvasCont='canvasQmh';
calculate(formulaQmhText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaPsText = `P_{\\text{сек}} = \\frac{q_{\\text{0 час}} * \\text{U}}{3600 * \\text{N} * q_{\\text{0}}} {\\text{, (3.4) где}}`;
hiddenFormulaCont = 'hiddenFormulaPs';
formulaCont='formulaPs';
canvasCont='canvasPs';
calculate(formulaPsText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaPhText = `P_{\\text{ч}} = \\frac{P_{\\text{c}} * 3600 * q}{q_{\\text{0ч}}} {\\text{, (3.5) где}}`;
hiddenFormulaCont = 'hiddenFormulaPh';
formulaCont='formulaPh';
canvasCont='canvasPh';
calculate(formulaPhText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaTableQdText = `q_{\\text{сут.}} \\text{, } \\frac{\\text{м³}}{\\text{сут}}`;
hiddenFormulaCont = 'hiddenFormulaTableQd';
formulaCont='formulaTableQd';
canvasCont='canvasTableQd';
calculate(formulaTableQdText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaTableQmhText = `q_{\\text{ср. час}} \\text{, } \\frac{\\text{м³}}{\\text{час}}`;
hiddenFormulaCont = 'hiddenFormulaTableQmh';
formulaCont='formulaTableQmh';
canvasCont='canvasTableQmh';
calculate(formulaTableQmhText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaTableQmaxhText = `q_{\\text{max час}} \\text{, } \\frac{\\text{м³}}{\\text{час}}`;
hiddenFormulaCont = 'hiddenFormulaTableQmaxh';
formulaCont='formulaTableQmaxh';
canvasCont='canvasTableQmaxh';
calculate(formulaTableQmaxhText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaTableQmaxsText = `q_{\\text{max сек.}} \\text{, } \\frac{\\text{л}}{\\text{сек}}`;
hiddenFormulaCont = 'hiddenFormulaTableQmaxs';
formulaCont='formulaTableQmaxs';
canvasCont='canvasTableQmaxs';
calculate(formulaTableQmaxsText, hiddenFormulaCont,formulaCont,canvasCont);

function allValue(item, value) {
    let items = document.querySelectorAll(item);
    for (let i = 0; i < items.length; i++){
        const span = document.createElement('span');
        span.textContent = value;
        items[i].parentElement.append(span);
        items[i].remove();
    }
}

function calculate(formulaResult, hiddenFormulaCont, formulaCont, canvasCont) {
//  var value = document.getElementById('value').value;
    var hiddenFormulaDiv = document.getElementById(hiddenFormulaCont);

    hiddenFormulaDiv.innerHTML = `$$${formulaResult}$$`;
    MathJax.typesetPromise([hiddenFormulaDiv]).then(() => {
        var svg = hiddenFormulaDiv.querySelector('svg');
        var canvas = document.getElementById(canvasCont);
        if (svg) {
            var xml = new XMLSerializer().serializeToString(svg);
            var svg64 = btoa(unescape(encodeURIComponent(xml)));
            var img64 = 'data:image/svg+xml;base64,' + svg64;
            var img = new Image();
            img.onload = function() {
                // Увеличение разрешения и уменьшение размера
                var scaleFactor = 1.1;
                canvas.width = img.width * scaleFactor;
                canvas.height = img.height * scaleFactor;
                var ctx = canvas.getContext('2d');
                ctx.scale(scaleFactor, scaleFactor);
                ctx.drawImage(img, 0, 0);
                var png = canvas.toDataURL("image/png");

                var formulaDiv = document.getElementById(formulaCont);
//		var formulaDivT = document.getElementById('testf');
                document.getElementById(formulaCont).innerHTML = '';

                var pngImg = document.createElement('img');
                pngImg.src = png;
                pngImg.style.maxWidth = "80%"; // Ограничение ширины изображения
                formulaDiv.appendChild(pngImg);
                document.getElementById(hiddenFormulaCont).innerHTML = '';
            };
            img.src = img64;

        }
    }).catch(err => console.error(err));
}

function findAlphaByNP(npValue) {
    if (npValue < 0.015) {
        return 0.200;
    }
    if (npValue >= 0.015 && npValue < 0.200) {
        return interpolation(npValue, 3);
    }
    if (npValue >= 0.20 && npValue < 2.00) {
        return interpolation(npValue, 3);
    }
    if (npValue >= 2.0 && npValue < 50.0) {
        return interpolation(npValue, 3);
    }
    if (npValue >= 50.0 && npValue <= 755.0) {
        return interpolation(npValue, 2);
    }

    function interpolation(x, num) {
        for (let i = 0; i < npToAlphaTable.length - 1; i++) {
            const x1 = npToAlphaTable[i].np;
            const x2 = npToAlphaTable[i + 1].np;
            const y1 = npToAlphaTable[i].alpha;
            const y2 = npToAlphaTable[i + 1].alpha;

            if (x >= x1 && x <= x2) {
                return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
            }
        }
    }
}

function findMatchingValues(inputQ, inputD) {
    // 1. Копируем и сортируем — без мутации
    const sorted = [...dataset].sort((a, b) => a.Q - b.Q);

    // 2. Находим ближайшее Q >= inputQ
    const foundQ = sorted.find(entry => entry.Q >= inputQ);
    if (!foundQ) return null;

    const values = foundQ.values;
    let target = null;

    // 3. Ищем строку с нужным d
    target = values.find(item =>
        item.d === inputD &&
        item.v >= 0.3 &&
        item.v <= 1.5
    );

    // 4. Если не нашли по d — ищем след подходящее v
    if (!target) {
        target = values.find(item =>
            item.d > inputD &&
            item.v >= 0.3 &&
            item.v <= 1.5
        );
    }

    if (!target) {
        console.log("Значение с нужным v не найдено")
        return null;
    }

    // 4. Возвращаем результат
    return {
        inputQ,
        Q_used: foundQ.Q,
        d: target.d,
        v: target.v,
        i: target.i / 1000,
        i1000: target.i
    };
}

// function findMatchingValues(inputQ) {
//     // сортируем Q по возрастанию
//     const sorted = [...dataset].sort((a, b) => a.Q - b.Q);
//
//     // находим ближайшее значение Q >= inputQ
//     const foundQ = sorted.find(entry => entry.Q >= inputQ);
//     if (!foundQ) return null;
//
//     // находим первую строку, где v в диапазоне 0.3–1.5
//     const target = foundQ.values.find(item => item.v >= 0.3 && item.v <= 1.5);
//     if (!target) return null;
//
//     return {
//         inputQ,
//         Q_used: foundQ.Q,
//         d: target.d,
//         v: target.v,
//         i: target.i / 1000,
//         i1000: target.i
//     };
// }

function findDQS(qInput) {
    const table = [
        { d: 15, q: 1.2, s: 14.5 },
        { d: 20, q: 2, s: 5.18 },
        { d: 25, q: 2.8, s: 2.64 },
        { d: 32, q: 4, s: 1.3 },
        { d: 40, q: 6.4, s: 0.5 },
        { d: 50, q: 12, s: 0.143 },
        { d: 65, q: 17, s: 0.0081 },
        { d: 80, q: 36, s: 0.00264 },
        { d: 100, q: 65, s: 0.000766 },
        { d: 150, q: 140, s: 0.000013 },
        { d: 200, q: 210, s: 0.000035 },
        { d: 250, q: 380, s: 0.000018 }
    ];

    // Находим первую строку, где q > qInput
    let index = table.findIndex(row => row.q > qInput);

    // Если нет больше — берём последнюю
    if (index === -1) return table[table.length - 1];
    let result = table[index];

    const firstD = result.d;
    const firstS = result.s;

    // Проверка условия
    while (qInput ** 2 * result.s > 5 && index + 1 < table.length) {
        result = table[index + 1];
        index++;
    }

    return{
        qInput,
        d: result.d,
        q: result.q,
        s: result.s,
        firstD: firstD,
        firstS: firstS
    };
}

console.log(findDQS(1.5));
// => { d: 20, q: 2, s: 70 }

console.log(findDQS(3));
// => { d: 25, q: 2.8, s: 2.64 } → 3² * 2.64 = 23.76 > 5 → берём следующее → { d: 32, q: 4, s: 1.3 }

console.log(findDQS(6));
// => { d: 40, q: 6.4, s: 0.5 } (6²*0.5=18>5 → берём следующее {d:50,...})

console.log(findDQS(1,16));
// => { d: 40, q: 6.4, s: 0.5 } (6²*0.5=18>5 → берём следующее {d:50,...})

console.log("111");
// => { d: 40, q: 6.4, s: 0.5 } (6²*0.5=18>5 → берём следующее {d:50,...})

console.log(findDQS(0,72));
// => { d: 40, q: 6.4, s: 0.5 } (6²*0.5=18>5 → берём следующее {d:50,...})

const dataset = [
    {
        "Q": 0.010,
        "values": [
            { "d": 6, "v": 0.47, "i": 257.6 },
            { "d": 8, "v": 0.19, "i": 29.9 }
        ]
    },
    {
        "Q": 0.015,
        "values": [
            { "d": 6, "v": 0.71, "i": 538.7 },
            { "d": 8, "v": 0.29, "i": 61.2 }
        ]
    },
    {
        "Q": 0.020,
        "values": [
            { "d": 6, "v": 0.94, "i": 916.1 },
            { "d": 8, "v": 0.39, "i": 102.2 }
        ]
    },
    {
        "Q": 0.025,
        "values": [
            { "d": 6, "v": 1.18, "i": 1389 },
            { "d": 8, "v": 0.49, "i": 152.8 },
            { "d": 10, "v": 0.24, "i": 26.6 }
        ]
    },
    {
        "Q": 0.030,
        "values": [
            { "d": 6, "v": 1.41, "i": 1989 },
            { "d": 8, "v": 0.58, "i": 212.6 },
            { "d": 10, "v": 0.28, "i": 36.7 }
        ]
    },
    {
        "Q": 0.035,
        "values": [
            { "d": 6, "v": 1.65, "i": 2707.0 },
            { "d": 8, "v": 0.68, "i": 281.8 },
            { "d": 10, "v": 0.33, "i": 48.2 },
            { "d": 15, "v": 0.21, "i": 15.3 }
        ]
    },
    {
        "Q": 0.040,
        "values": [
            { "d": 6, "v": 1.88, "i": 3536.0 },
            { "d": 8, "v": 0.78, "i": 360.1 },
            { "d": 10, "v": 0.38, "i": 61.2 },
            { "d": 15, "v": 0.24, "i": 19.4 }
        ]
    },
    {
        "Q": 0.045,
        "values": [
            { "d": 6, "v": 2.12, "i": 4475.0 },
            { "d": 8, "v": 0.87, "i": 447.6 },
            { "d": 10, "v": 0.43, "i": 75.7 },
            { "d": 15, "v": 0.27, "i": 23.9 }
        ]
    },
    {
        "Q": 0.055,
        "values": [
            { "d": 6, "v": 2.35, "i": 5525.0 },
            { "d": 8, "v": 0.97, "i": 544.1 },
            { "d": 10, "v": 0.47, "i": 91.5 },
            { "d": 15, "v": 0.29, "i": 28.8 }
        ]
    },
    {
        "Q": 0.060,
        "values": [
            { "d": 6, "v": 2.59, "i": 6685.0 },
            { "d": 8, "v": 1.07, "i": 649.8 },
            { "d": 10, "v": 0.52, "i": 108.7 },
            { "d": 15, "v": 0.32, "i": 34.1 }
        ]
    },
    {
        "Q": 0.060,
        "values": [
            { "d": 6, "v": 2.83, "i": 7055.0 },
            { "d": 8, "v": 1.16, "i": 764.5 },
            { "d": 10, "v": 0.57, "i": 127.3 },
            { "d": 15, "v": 0.35, "i": 39.9 }
        ]
    },
    {
        "Q": 0.065,
        "values": [
            { "d": 6, "v": 3.06, "i": 9337.0 },
            { "d": 8, "v": 1.28, "i": 831.2 },
            { "d": 10, "v": 0.62, "i": 147.3 },
            { "d": 15, "v": 0.38, "i": 46.0 },
            { "d": 20, "v": 0.20, "i": 9.84 }
        ]
    },
    {
        "Q": 0.070,
        "values": [
            { "d": 8, "v": 1.36, "i": 1034.0 },
            { "d": 10, "v": 0.66, "i": 168.7 },
            { "d": 15, "v": 0.41, "i": 52.6 },
            { "d": 20, "v": 0.22, "i": 11.2 }
        ]
    },
    {
        "Q": 0.075,
        "values": [
            { "d": 8, "v": 1.46, "i": 1187.0 },
            { "d": 10, "v": 0.71, "i": 191.4 },
            { "d": 15, "v": 0.44, "i": 59.5 },
            { "d": 20, "v": 0.23, "i": 12.7 }
        ]
    },
    {
        "Q": 0.080,
        "values": [
            { "d": 8, "v": 1.55, "i": 1350.0 },
            { "d": 10, "v": 0.76, "i": 215.5 },
            { "d": 15, "v": 0.47, "i": 66.9 },
            { "d": 20, "v": 0.25, "i": 14.2 }
        ]
    },
    {
        "Q": 0.085,
        "values": [
            { "d": 8, "v": 1.65, "i": 1524.0 },
            { "d": 10, "v": 0.80, "i": 240.9 },
            { "d": 15, "v": 0.50, "i": 74.6 },
            { "d": 20, "v": 0.27, "i": 15.8 }
        ]
    },
    {
        "Q": 0.090,
        "values": [
            { "d": 8, "v": 1.75, "i": 1709.0 },
            { "d": 10, "v": 0.85, "i": 267.8 },
            { "d": 15, "v": 0.53, "i": 82.8 },
            { "d": 20, "v": 0.28, "i": 17.5 }
        ]
    },
    {
        "Q": 0.095,
        "values": [
            { "d": 8, "v": 1.84, "i": 1904.0 },
            { "d": 10, "v": 0.90, "i": 295.9 },
            { "d": 15, "v": 0.56, "i": 91.3 },
            { "d": 20, "v": 0.30, "i": 19.2 }
        ]
    },
    {
        "Q": 0.100,
        "values": [
            { "d": 8, "v": 1.94, "i": 2109.0 },
            { "d": 10, "v": 0.95, "i": 325.5 },
            { "d": 15, "v": 0.59, "i": 100.2 },
            { "d": 20, "v": 0.31, "i": 21.1 }
        ]
    },
    {
        "Q": 0.110,
        "values": [
            { "d": 8, "v": 2.13, "i": 2552.0 },
            { "d": 10, "v": 1.04, "i": 388.6 },
            { "d": 15, "v": 0.65, "i": 119.3 },
            { "d": 20, "v": 0.34, "i": 25.0 }
        ]
    },
    {
        "Q": 0.12,
        "values": [
            { "d": 8, "v": 2.33, "i": 3037.0 },
            { "d": 10, "v": 1.14, "i": 457.2 },
            { "d": 15, "v": 0.71, "i": 139.9 },
            { "d": 20, "v": 0.37, "i": 29.22 },
            { "d": 25, "v": 0.22, "i": 8.44 }
        ]
    },
    {
        "Q": 0.13,
        "values": [
            { "d": 8, "v": 2.52, "i": 3565.0 },
            { "d": 10, "v": 1.23, "i": 531.2 },
            { "d": 15, "v": 0.77, "i": 162.0 },
            { "d": 20, "v": 0.41, "i": 33.7 },
            { "d": 25, "v": 0.24, "i": 9.72 }
        ]
    },
    {
        "Q": 0.14,
        "values": [
            { "d": 8, "v": 2.72, "i": 4134.0 },
            { "d": 10, "v": 1.32, "i": 616.0 },
            { "d": 15, "v": 0.82, "i": 185.7 },
            { "d": 20, "v": 0.44, "i": 38.5 },
            { "d": 25, "v": 0.26, "i": 11.1 }
        ]
    },
    {
        "Q": 0.15,
        "values": [
            { "d": 8, "v": 2.91, "i": 4740.0 },
            { "d": 10, "v": 1.42, "i": 707.2 },
            { "d": 15, "v": 0.88, "i": 211.0 },
            { "d": 20, "v": 0.47, "i": 43.6 },
            { "d": 25, "v": 0.28, "i": 12.5 }
        ]
    },
    {
        "Q": 0.16,
        "values": [
            { "d": 8, "v": 3.10, "i": 5400.0 },
            { "d": 10, "v": 1.51, "i": 804.6 },
            { "d": 15, "v": 0.94, "i": 237.8 },
            { "d": 20, "v": 0.50, "i": 49.0 },
            { "d": 25, "v": 0.30, "i": 14.0 }
        ]
    },
    {
        "Q": 0.17,
        "values": [
            { "d": 10, "v": 1.62, "i": 908.3 },
            { "d": 15, "v": 1.00, "i": 266.2 },
            { "d": 20, "v": 0.53, "i": 54.6 },
            { "d": 25, "v": 0.32, "i": 15.6 }
        ]
    },
    {
        "Q": 0.18,
        "values": [
            { "d": 10, "v": 1.70, "i": 1018.0 },
            { "d": 15, "v": 1.06, "i": 296.1 },
            { "d": 20, "v": 0.55, "i": 60.6 },
            { "d": 25, "v": 0.34, "i": 17.3 }
        ]
    },
    {
        "Q": 0.19,
        "values": [
            { "d": 10, "v": 1.80, "i": 1135.0 },
            { "d": 15, "v": 1.12, "i": 327.6 },
            { "d": 20, "v": 0.59, "i": 66.9 },
            { "d": 25, "v": 0.36, "i": 19.1 },
            { "d": 32, "v": 0.20, "i": 4.67 }
        ]
    },
    {
        "Q": 0.20,
        "values": [
            { "d": 10, "v": 1.89, "i": 1257.0 },
            { "d": 15, "v": 1.18, "i": 350.5 },
            { "d": 20, "v": 0.62, "i": 73.5 },
            { "d": 25, "v": 0.37, "i": 20.9 },
            { "d": 32, "v": 0.21, "i": 5.11 }
        ]
    },
    {
        "Q": 0.25,
        "values": [
            { "d": 10, "v": 2.37, "i": 1964.0 },
            { "d": 15, "v": 1.47, "i": 550.4 },
            { "d": 20, "v": 0.78, "i": 110.6 },
            { "d": 25, "v": 0.47, "i": 31.2 },
            { "d": 32, "v": 0.26, "i": 7.57 },
            { "d": 40, "v": 0.20, "i": 3.91 }
        ]
    },
    {
        "Q": 0.30,
        "values": [
            { "d": 10, "v": 2.84, "i": 2829.0 },
            { "d": 15, "v": 1.77, "i": 807.0 },
            { "d": 20, "v": 0.94, "i": 154.9 },
            { "d": 25, "v": 0.56, "i": 43.4 },
            { "d": 32, "v": 0.31, "i": 10.5 },
            { "d": 40, "v": 0.24, "i": 5.39 }
        ]
    },
    {
        "Q": 0.35,
        "values": [
            { "d": 10, "v": 3.31 },
            { "d": 15, "v": 2.03, "i": 1098.0 },
            { "d": 20, "v": 1.09, "i": 206.4 },
            { "d": 25, "v": 0.65, "i": 57.5 },
            { "d": 32, "v": 0.37, "i": 13.8 },
            { "d": 40, "v": 0.28, "i": 7.08 }
        ]
    },
    {
        "Q": 0.40,
        "values": [
            { "d": 15, "v": 2.33, "i": 1435.0 },
            { "d": 20, "v": 1.25, "i": 265.6 },
            { "d": 25, "v": 0.75, "i": 73.5 },
            { "d": 32, "v": 0.42, "i": 17.5 },
            { "d": 40, "v": 0.32, "i": 8.98 }
        ]
    },
    {
        "Q": 0.45,
        "values": [
            { "d": 15, "v": 2.65, "i": 1816.0 },
            { "d": 20, "v": 1.40, "i": 336.1 },
            { "d": 25, "v": 0.84, "i": 91.3 },
            { "d": 32, "v": 0.47, "i": 21.6 },
            { "d": 40, "v": 0.36, "i": 11.1 },
            { "d": 50, "v": 0.21, "i": 3.11 }
        ]
    },
    {
        "Q": 0.50,
        "values": [
            { "d": 15, "v": 2.95, "i": 2242.0 },
            { "d": 20, "v": 1.53, "i": 414.9 },
            { "d": 25, "v": 0.93, "i": 110.9 },
            { "d": 32, "v": 0.52, "i": 26.2 },
            { "d": 40, "v": 0.40, "i": 13.4 },
            { "d": 50, "v": 0.24, "i": 3.75 }
        ]
    },
    {
        "Q": 0.55,
        "values": [
            { "d": 15, "v": 3.24, "i": 2712.0 },
            { "d": 20, "v": 1.72, "i": 502.1 },
            { "d": 25, "v": 1.03, "i": 132.5 },
            { "d": 32, "v": 0.57, "i": 31.1 },
            { "d": 40, "v": 0.44, "i": 15.9 },
            { "d": 50, "v": 0.26, "i": 4.44 }
        ]
    },
    {
        "Q": 0.60,
        "values": [
            { "d": 20, "v": 1.87, "i": 597.5 },
            { "d": 25, "v": 1.12, "i": 155.8 },
            { "d": 32, "v": 0.63, "i": 35.5 },
            { "d": 40, "v": 0.48, "i": 18.6 },
            { "d": 50, "v": 0.28, "i": 5.18 }
        ]
    },
    {
        "Q": 0.65,
        "values": [
            { "d": 20, "v": 2.03, "i": 701.2 },
            { "d": 25, "v": 1.21, "i": 180.7 },
            { "d": 32, "v": 0.68, "i": 42.2 },
            { "d": 40, "v": 0.52, "i": 21.5 },
            { "d": 50, "v": 0.31, "i": 5.97 },
            { "d": 70, "v": 0.19, "i": 1.82 }
        ]
    },
    {
        "Q": 0.70,
        "values": [
            { "d": 20, "v": 2.18, "i": 813.3 },
            { "d": 25, "v": 1.31, "i": 209.6 },
            { "d": 32, "v": 0.73, "i": 49.4 },
            { "d": 40, "v": 0.55, "i": 24.6 },
            { "d": 50, "v": 0.33, "i": 6.81 },
            { "d": 70, "v": 0.20, "i": 2.07 }
        ]
    },
    {
        "Q": 0.75,
        "values": [
            { "d": 20, "v": 2.34, "i": 933.6 },
            { "d": 25, "v": 1.40, "i": 240.6 },
            { "d": 32, "v": 0.78, "i": 54.9 },
            { "d": 40, "v": 0.60, "i": 27.9 },
            { "d": 50, "v": 0.35, "i": 7.70 },
            { "d": 70, "v": 0.22, "i": 2.34 }
        ]
    },
    {
        "Q": 0.80,
        "values": [
            { "d": 20, "v": 3.50, "i": 1062 },
            { "d": 25, "v": 1.50, "i": 273.8 },
            { "d": 32, "v": 0.84, "i": 61.9 },
            { "d": 40, "v": 0.64, "i": 31.3 },
            { "d": 50, "v": 0.38, "i": 8.64 },
            { "d": 70, "v": 0.23, "i": 2.63 }
        ]
    },
    {
        "Q": 0.85,
        "values": [
            { "d": 20, "v": 2.05, "i": 1199 },
            { "d": 25, "v": 1.59, "i": 309.1 },
            { "d": 32, "v": 0.89, "i": 69.2 },
            { "d": 40, "v": 0.68, "i": 35.0 },
            { "d": 50, "v": 0.40, "i": 9.64 },
            { "d": 70, "v": 0.24, "i": 2.92 }
        ]
    },
    {
        "Q": 1.00,
        "values": [
            { "d": 20, "v": 3.12, "i": 1680 },
            { "d": 25, "v": 1.87, "i": 427.8 },
            { "d": 32, "v": 1.05, "i": 93.6 },
            { "d": 40, "v": 0.80, "i": 47.2 },
            { "d": 50, "v": 0.47, "i": 12.9 },
            { "d": 70, "v": 0.29, "i": 3.89 },
            { "d": 80, "v": 0.20, "i": 1.64 }
        ]
    },
    {
        "Q": 1.05,
        "values": [
            { "d": 25, "v": 1.96, "i": 471.6 },
            { "d": 32, "v": 1.10, "i": 102.6 },
            { "d": 40, "v": 0.84, "i": 51.7 },
            { "d": 50, "v": 0.49, "i": 14.1 },
            { "d": 70, "v": 0.30, "i": 4.24 },
            { "d": 80, "v": 0.21, "i": 1.79 }
        ]
    },
    {
        "Q": 1.10,
        "values": [
            { "d": 25, "v": 2.06, "i": 517.6 },
            { "d": 32, "v": 1.15, "i": 111.9 },
            { "d": 40, "v": 0.88, "i": 56.3 },
            { "d": 50, "v": 0.52, "i": 15.3 },
            { "d": 70, "v": 0.32, "i": 4.61 },
            { "d": 80, "v": 0.22, "i": 1.94 }
        ]
    },
    {
        "Q": 1.15,
        "values": [
            { "d": 25, "v": 2.15, "i": 565.7 },
            { "d": 32, "v": 1.20, "i": 121.3 },
            { "d": 40, "v": 0.92, "i": 61.1 },
            { "d": 50, "v": 0.54, "i": 16.6 },
            { "d": 70, "v": 0.33, "i": 4.99 },
            { "d": 80, "v": 0.23, "i": 2.10 }
        ]
    },
    {
        "Q": 1.20,
        "values": [
            { "d": 25, "v": 2.24, "i": 616.0 },
            { "d": 32, "v": 1.25, "i": 132.0 },
            { "d": 40, "v": 0.95, "i": 66.1 },
            { "d": 50, "v": 0.57, "i": 18.0 },
            { "d": 70, "v": 0.35, "i": 5.38 },
            { "d": 80, "v": 0.24, "i": 2.26 }
        ]
    },
    {
        "Q": 1.25,
        "values": [
            { "d": 25, "v": 2.34, "i": 668.4 },
            { "d": 32, "v": 1.31, "i": 143.3 },
            { "d": 40, "v": 0.99, "i": 71.4 },
            { "d": 50, "v": 0.59, "i": 19.4 },
            { "d": 70, "v": 0.36, "i": 5.79 },
            { "d": 80, "v": 0.25, "i": 2.43 }
        ]
    },
    {
        "Q": 1.30,
        "values": [
            { "d": 25, "v": 2.43, "i": 723.0 },
            { "d": 32, "v": 1.36, "i": 155.0 },
            { "d": 40, "v": 1.03, "i": 76.8 },
            { "d": 50, "v": 0.61, "i": 20.8 },
            { "d": 70, "v": 0.37, "i": 6.21 },
            { "d": 80, "v": 0.26, "i": 2.60 }
        ]
    },
    {
        "Q": 1.35,
        "values": [
            { "d": 25, "v": 2.52, "i": 779.6 },
            { "d": 32, "v": 1.41, "i": 167.1 },
            { "d": 40, "v": 1.07, "i": 82.4 },
            { "d": 50, "v": 0.64, "i": 22.3 },
            { "d": 70, "v": 0.39, "i": 6.64 },
            { "d": 80, "v": 0.27, "i": 2.78 },
            { "d": 90, "v": 0.20 }
        ]
    },
    {
        "Q": 1.40,
        "values": [
            { "d": 25, "v": 2.62, "i": 838.5 },
            { "d": 32, "v": 1.46, "i": 179.7 },
            { "d": 40, "v": 1.11, "i": 88.2 },
            { "d": 50, "v": 0.66, "i": 23.8 },
            { "d": 70, "v": 0.40, "i": 7.09 },
            { "d": 80, "v": 0.28, "i": 2.97 },
            { "d": 90, "v": 0.21 }
        ]
    },
    {
        "Q": 1.45,
        "values": [
            { "d": 25, "v": 2.71, "i": 899.4 },
            { "d": 32, "v": 1.52, "i": 192.8 },
            { "d": 40, "v": 1.15, "i": 94.1 },
            { "d": 50, "v": 0.68, "i": 25.4 },
            { "d": 70, "v": 0.42, "i": 7.55 },
            { "d": 80, "v": 0.29, "i": 3.16 },
            { "d": 90, "v": 0.22 }
        ]
    },
    {
        "Q": 1.50,
        "values": [
            { "d": 25, "v": 2.80, "i": 962.5 },
            { "d": 32, "v": 1.57, "i": 206.3 },
            { "d": 40, "v": 1.19, "i": 100.3 },
            { "d": 50, "v": 0.71, "i": 27.0 },
            { "d": 70, "v": 0.43, "i": 8.03 },
            { "d": 80, "v": 0.30, "i": 3.36 },
            { "d": 90, "v": 0.22, "i": 4 }
        ]
    },
    {
        "Q": 1.55,
        "values": [
            { "d": 25, "v": 2.90, "i": 1028 },
            { "d": 32, "v": 1.62, "i": 220.3 },
            { "d": 40, "v": 1.23, "i": 106.7 },
            { "d": 50, "v": 0.73, "i": 28.7 },
            { "d": 70, "v": 0.45, "i": 8.51 },
            { "d": 80, "v": 0.31, "i": 3.56 },
            { "d": 90, "v": 0.23 }
        ]
    },
    {
        "Q": 1.60,
        "values": [
            { "d": 25, "v": 2.99, "i": 1095 },
            { "d": 32, "v": 1.67, "i": 234.7 },
            { "d": 40, "v": 1.27, "i": 113.7 },
            { "d": 50, "v": 0.75, "i": 30.4 },
            { "d": 70, "v": 0.46, "i": 9.01 },
            { "d": 80, "v": 0.32, "i": 3.77 },
            { "d": 90, "v": 0.24 }
        ]
    },
    {
        "Q": 1.65,
        "values": [
            { "d": 25, "v": 3.08, "i": 1165 },
            { "d": 32, "v": 1.72, "i": 249.6 },
            { "d": 40, "v": 1.31, "i": 120.9 },
            { "d": 50, "v": 0.78, "i": 32.2 },
            { "d": 70, "v": 0.48, "i": 9.53 },
            { "d": 80, "v": 0.33, "i": 3.98 },
            { "d": 90, "v": 0.25 }
        ]
    },
    {
        "Q": 1.70,
        "values": [
            { "d": 32, "v": 1.78, "i": 265.0 },
            { "d": 40, "v": 1.35, "i": 128.4 },
            { "d": 50, "v": 0.80, "i": 34.0 },
            { "d": 70, "v": 0.49, "i": 10.1 },
            { "d": 80, "v": 0.34, "i": 4.20 },
            { "d": 90, "v": 0.25 }
        ]
    },
    {
        "Q": 1.75,
        "values": [
            { "d": 32, "v": 1.83, "i": 260.8 },
            { "d": 40, "v": 1.39, "i": 136.0 },
            { "d": 50, "v": 0.82, "i": 35.9 },
            { "d": 70, "v": 0.50, "i": 10.6 },
            { "d": 80, "v": 0.35, "i": 4.42 },
            { "d": 90, "v": 0.26 }
        ]
    },
    {
        "Q": 1.80,
        "values": [
            { "d": 32, "v": 1.88, "i": 297.1 },
            { "d": 40, "v": 1.43, "i": 143.9 },
            { "d": 50, "v": 0.85, "i": 37.8 },
            { "d": 70, "v": 0.52, "i": 11.2 },
            { "d": 80, "v": 0.36, "i": 4.65 },
            { "d": 90, "v": 0.27, "i": 2.25 },
            { "d": 100, "v": 0.212, "i": 1.27 }
        ]
    },
    {
        "Q": 1.85,
        "values": [
            { "d": 32, "v": 1.93, "i": 313.8 },
            { "d": 40, "v": 1.47, "i": 152.0 },
            { "d": 50, "v": 0.87, "i": 39.7 },
            { "d": 70, "v": 0.53, "i": 11.7 },
            { "d": 80, "v": 0.37, "i": 4.88 },
            { "d": 90, "v": 0.28, "i": 2.36 },
            { "d": 100, "v": 0.22, "i": 1.33 }
        ]
    },
    {
        "Q": 1.90,
        "values": [
            { "d": 32, "v": 1.99, "i": 331.0 },
            { "d": 40, "v": 1.51, "i": 160.3 },
            { "d": 50, "v": 0.89, "i": 41.8 },
            { "d": 70, "v": 0.55, "i": 12.3 },
            { "d": 80, "v": 0.38, "i": 5.12 },
            { "d": 90, "v": 0.284, "i": 2.48 },
            { "d": 100, "v": 0.224, "i": 1.39 }
        ]
    },
    {
        "Q": 1.95,
        "values": [
            { "d": 32, "v": 2.04, "i": 348.7 },
            { "d": 40, "v": 1.55, "i": 168.9 },
            { "d": 50, "v": 0.92, "i": 43.8 },
            { "d": 70, "v": 0.56, "i": 12.9 },
            { "d": 80, "v": 0.39, "i": 5.36 },
            { "d": 90, "v": 0.29, "i": 2.59 },
            { "d": 100, "v": 0.23, "i": 1.46 }
        ]
    },
    {
        "Q": 2.00,
        "values": [
            { "d": 32, "v": 2.09, "i": 366.8 },
            { "d": 40, "v": 1.59, "i": 177.7 },
            { "d": 50, "v": 0.94, "i": 45.9 },
            { "d": 70, "v": 0.58, "i": 13.5 },
            { "d": 80, "v": 0.40, "i": 5.61 },
            { "d": 90, "v": 0.30, "i": 2.71 },
            { "d": 100, "v": 0.24, "i": 1.52 }
        ]
    },
    {
        "Q": 2.10,
        "values": [
            { "d": 32, "v": 2.20, "i": 404.4 },
            { "d": 40, "v": 1.67, "i": 195.9 },
            { "d": 50, "v": 0.99, "i": 50.3 },
            { "d": 70, "v": 0.60, "i": 14.8 },
            { "d": 80, "v": 0.42, "i": 6.13 },
            { "d": 90, "v": 0.31, "i": 2.96 },
            { "d": 100, "v": 0.25, "i": 1.66 }
        ]
    },
    {
        "Q": 2.20,
        "values": [
            { "d": 32, "v": 2.30, "i": 443.8 },
            { "d": 40, "v": 1.75, "i": 215.0 },
            { "d": 50, "v": 1.04, "i": 54.8 },
            { "d": 70, "v": 0.63, "i": 16.1 },
            { "d": 80, "v": 0.44, "i": 6.66 },
            { "d": 90, "v": 0.33, "i": 3.21 },
            { "d": 100, "v": 0.26, "i": 1.80 }
        ]
    },
    {
        "Q": 2.30,
        "values": [
            { "d": 32, "v": 2.40, "i": 485.1 },
            { "d": 40, "v": 1.83, "i": 235.0 },
            { "d": 50, "v": 1.08, "i": 59.6 },
            { "d": 70, "v": 0.66, "i": 17.4 },
            { "d": 80, "v": 0.46, "i": 7.22 },
            { "d": 90, "v": 0.34, "i": 3.48 },
            { "d": 100, "v": 0.27, "i": 1.95 }
        ]
    },
    {
        "Q": 2.40,
        "values": [
            { "d": 32, "v": 2.51, "i": 528.2 },
            { "d": 40, "v": 1.91, "i": 255.8 },
            { "d": 50, "v": 1.13, "i": 64.5 },
            { "d": 70, "v": 0.69, "i": 18.8 },
            { "d": 80, "v": 0.48, "i": 7.79 },
            { "d": 90, "v": 0.36, "i": 3.75 },
            { "d": 100, "v": 0.28, "i": 2.10 }
        ]
    },
    {
        "Q": 2.50,
        "values": [
            { "d": 32, "v": 2.61, "i": 573.1 },
            { "d": 40, "v": 1.99, "i": 277.6 },
            { "d": 50, "v": 1.18, "i": 69.6 },
            { "d": 70, "v": 0.72, "i": 20.3 },
            { "d": 80, "v": 0.50, "i": 8.39 },
            { "d": 90, "v": 0.37, "i": 4.04 },
            { "d": 100, "v": 0.29, "i": 2.26 }
        ]
    },
    {
        "Q": 2.6,
        "values": [
            { "d": 32, "v": 2.72, "i": 619.9 },
            { "d": 40, "v": 2.07, "i": 300.2 },
            { "d": 50, "v": 1.22, "i": 74.9 },
            { "d": 70, "v": 0.75, "i": 21.8 },
            { "d": 80, "v": 0.52, "i": 9.01 },
            { "d": 90, "v": 0.39, "i": 4.33 },
            { "d": 100, "v": 0.31, "i": 2.42 }
        ]
    },
    {
        "Q": 2.7,
        "values": [
            { "d": 32, "v": 2.82, "i": 668.5 },
            { "d": 40, "v": 2.15, "i": 323.8 },
            { "d": 50, "v": 1.27, "i": 80.8 },
            { "d": 70, "v": 0.78, "i": 23.4 },
            { "d": 80, "v": 0.54, "i": 9.65 },
            { "d": 90, "v": 0.40, "i": 4.64 },
            { "d": 100, "v": 0.32, "i": 2.59 },
            { "d": 125, "v": 0.20, "i": 0.88 }
        ]
    },
    {
        "Q": 2.8,
        "values": [
            { "d": 32, "v": 2.93, "i": 718.9 },
            { "d": 40, "v": 2.23, "i": 348.2 },
            { "d": 50, "v": 1.32, "i": 86.9 },
            { "d": 70, "v": 0.81, "i": 25.0 },
            { "d": 80, "v": 0.56, "i": 10.3 },
            { "d": 90, "v": 0.42, "i": 4.95 },
            { "d": 100, "v": 0.33, "i": 2.77 },
            { "d": 125, "v": 0.21, "i": 0.94 }
        ]
    },
    {
        "Q": 2.9,
        "values": [
            { "d": 32, "v": 3.03, "i": 771.2 },
            { "d": 40, "v": 2.31, "i": 373.5 },
            { "d": 50, "v": 1.37, "i": 93.2 },
            { "d": 70, "v": 0.83, "i": 26.7 },
            { "d": 80, "v": 0.58, "i": 11.0 },
            { "d": 90, "v": 0.43, "i": 5.27 },
            { "d": 100, "v": 0.34, "i": 2.95 },
            { "d": 125, "v": 0.218, "i": 1.00 }
        ]
    },
    {
        "Q": 3.0,
        "values": [
            { "d": 40, "v": 2.39, "i": 399.7 },
            { "d": 50, "v": 1.41, "i": 99.7 },
            { "d": 70, "v": 0.86, "i": 28.4 },
            { "d": 80, "v": 0.60, "i": 11.7 },
            { "d": 90, "v": 0.45, "i": 5.60 },
            { "d": 100, "v": 0.35, "i": 3.13 },
            { "d": 125, "v": 0.226, "i": 1.06 }
        ]
    },
    {
        "Q": 3.1,
        "values": [
            { "d": 40, "v": 2.47, "i": 426.8 },
            { "d": 50, "v": 1.46, "i": 106.5 },
            { "d": 70, "v": 0.89, "i": 30.2 },
            { "d": 80, "v": 0.62, "i": 12.4 },
            { "d": 90, "v": 0.46, "i": 5.95 },
            { "d": 100, "v": 0.36, "i": 3.32 },
            { "d": 125, "v": 0.23, "i": 1.12 }
        ]
    },
    {
        "Q": 3.2,
        "values": [
            { "d": 40, "v": 2.55, "i": 454.8 },
            { "d": 50, "v": 1.51, "i": 113.4 },
            { "d": 70, "v": 0.92, "i": 32.0 },
            { "d": 80, "v": 0.64, "i": 13.1 },
            { "d": 90, "v": 0.48, "i": 6.30 },
            { "d": 100, "v": 0.38, "i": 3.51 },
            { "d": 125, "v": 0.24, "i": 1.19 }
        ]
    },
    {
        "Q": 3.3,
        "values": [
            { "d": 40, "v": 2.63, "i": 483.7 },
            { "d": 50, "v": 1.55, "i": 120.6 },
            { "d": 70, "v": 0.95, "i": 33.9 },
            { "d": 80, "v": 0.66, "i": 13.9 },
            { "d": 90, "v": 0.49, "i": 6.66 },
            { "d": 100, "v": 0.39, "i": 3.71 },
            { "d": 125, "v": 0.249, "i": 1.25 }
        ]
    },
    {
        "Q": 3.4,
        "values": [
            { "d": 40, "v": 2.71, "i": 513.4 },
            { "d": 50, "v": 1.60, "i": 128.1 },
            { "d": 70, "v": 0.98, "i": 35.8 },
            { "d": 80, "v": 0.68, "i": 14.7 },
            { "d": 90, "v": 0.51, "i": 7.03 },
            { "d": 100, "v": 0.40, "i": 3.92 },
            { "d": 125, "v": 0.255, "i": 1.32 }
        ]
    },
    {
        "Q": 3.5,
        "values": [
            { "d": 40, "v": 2.79, "i": 544.1 },
            { "d": 50, "v": 1.65, "i": 135.7 },
            { "d": 70, "v": 1.01, "i": 37.8 },
            { "d": 80, "v": 0.71, "i": 15.5 },
            { "d": 90, "v": 0.52, "i": 7.41 },
            { "d": 100, "v": 0.41, "i": 4.12 },
            { "d": 125, "v": 0.26, "i": 1.39 }
        ]
    },
    {
        "Q": 3.6,
        "values": [
            { "d": 40, "v": 2.86, "i": 575.6 },
            { "d": 50, "v": 1.70, "i": 143.6 },
            { "d": 70, "v": 1.04, "i": 39.9 },
            { "d": 80, "v": 0.73, "i": 16.3 },
            { "d": 90, "v": 0.54, "i": 7.79 },
            { "d": 100, "v": 0.42, "i": 4.34 },
            { "d": 125, "v": 0.27, "i": 1.46 }
        ]
    },
    {
        "Q": 3.7,
        "values": [
            { "d": 40, "v": 2.94, "i": 608.0 },
            { "d": 50, "v": 1.74, "i": 151.7 },
            { "d": 70, "v": 1.07, "i": 42.0 },
            { "d": 80, "v": 0.75, "i": 17.2 },
            { "d": 90, "v": 0.55, "i": 8.19 },
            { "d": 100, "v": 0.44, "i": 4.56 },
            { "d": 125, "v": 0.28, "i": 1.54 },
            { "d": 150, "v": 0.196, "i": 0.66 }
        ]
    },
    {
        "Q": 3.8,
        "values": [
            { "d": 40, "v": 3.02, "i": 641.4 },
            { "d": 50, "v": 1.79, "i": 160.0 },
            { "d": 70, "v": 1.09, "i": 44.1 },
            { "d": 80, "v": 0.77, "i": 18.0 },
            { "d": 90, "v": 0.57, "i": 8.60 },
            { "d": 100, "v": 0.45, "i": 4.78 },
            { "d": 125, "v": 0.286, "i": 1.61 },
            { "d": 150, "v": 0.20, "i": 0.69 }
        ]
    },
    {
        "Q": 3.9,
        "values": [
            { "d": 50, "v": 1.84, "i": 168.5 },
            { "d": 70, "v": 1.12, "i": 46.3 },
            { "d": 80, "v": 0.79, "i": 18.9 },
            { "d": 90, "v": 0.58, "i": 9.01 },
            { "d": 100, "v": 0.46, "i": 5.01 },
            { "d": 125, "v": 0.29, "i": 1.69 },
            { "d": 150, "v": 0.207, "i": 0.72 }
        ]
    },
    {
        "Q": 4.0,
        "values": [
            { "d": 50, "v": 1.88, "i": 177.3 },
            { "d": 70, "v": 1.15, "i": 48.5 },
            { "d": 80, "v": 0.81, "i": 19.8 },
            { "d": 90, "v": 0.60, "i": 9.44 },
            { "d": 100, "v": 0.47, "i": 5.25 },
            { "d": 125, "v": 0.30, "i": 1.76 },
            { "d": 150, "v": 0.21, "i": 0.75 }
        ]
    },
    {
        "Q": 4.1,
        "values": [
            { "d": 50, "v": 1.93, "i": 186.2 },
            { "d": 70, "v": 1.18, "i": 50.8 },
            { "d": 80, "v": 0.83, "i": 20.7 },
            { "d": 90, "v": 0.61, "i": 9.87 },
            { "d": 100, "v": 0.48, "i": 5.49 },
            { "d": 125, "v": 0.309, "i": 1.84 },
            { "d": 150, "v": 0.217, "i": 0.79 }
        ]
    },
    {
        "Q": 4.2,
        "values": [
            { "d": 50, "v": 1.98, "i": 195.4 },
            { "d": 70, "v": 1.21, "i": 53.1 },
            { "d": 80, "v": 0.85, "i": 21.7 },
            { "d": 90, "v": 0.63, "i": 10.3 },
            { "d": 100, "v": 0.49, "i": 5.73 },
            { "d": 125, "v": 0.316, "i": 1.92 },
            { "d": 150, "v": 0.22, "i": 0.82 }
        ]
    },
    {
        "Q": 4.3,
        "values": [
            { "d": 50, "v": 2.02, "i": 204.8 },
            { "d": 70, "v": 1.24, "i": 55.6 },
            { "d": 80, "v": 0.87, "i": 22.6 },
            { "d": 90, "v": 0.64, "i": 10.8 },
            { "d": 100, "v": 0.51, "i": 5.98 },
            { "d": 125, "v": 0.32, "i": 2.01 },
            { "d": 150, "v": 0.228, "i": 0.86 }
        ]
    },
    {
        "Q": 4.4,
        "values": [
            { "d": 50, "v": 2.07, "i": 214.5 },
            { "d": 70, "v": 1.27, "i": 58.2 },
            { "d": 80, "v": 0.89, "i": 23.6 },
            { "d": 90, "v": 0.66, "i": 11.2 },
            { "d": 100, "v": 0.52, "i": 6.23 },
            { "d": 125, "v": 0.33, "i": 2.09 },
            { "d": 150, "v": 0.23, "i": 0.89 }
        ]
    },
    {
        "Q": 4.5,
        "values": [
            { "d": 50, "v": 2.12, "i": 224.3 },
            { "d": 70, "v": 1.30, "i": 60.9 },
            { "d": 80, "v": 0.91, "i": 24.6 },
            { "d": 90, "v": 0.67, "i": 11.7 },
            { "d": 100, "v": 0.53, "i": 6.49 },
            { "d": 125, "v": 0.339, "i": 2.15 },
            { "d": 150, "v": 0.238, "i": 0.93 }
        ]
    },
    {
        "Q": 4.7,
        "values": [
            { "d": 50, "v": 2.27, "i": 244.7 },
            { "d": 70, "v": 1.35, "i": 60.5 },
            { "d": 80, "v": 0.95, "i": 25.7 },
            { "d": 90, "v": 0.70, "i": 12.7 },
            { "d": 100, "v": 0.55, "i": 7.03 },
            { "d": 125, "v": 0.35, "i": 2.35 },
            { "d": 150, "v": 0.24, "i": 1.00 }
        ]
    },
    {
        "Q": 4.8,
        "values": [
            { "d": 50, "v": 2.26, "i": 255.3 },
            { "d": 70, "v": 1.38, "i": 63.3 },
            { "d": 80, "v": 0.97, "i": 27.8 },
            { "d": 90, "v": 0.72, "i": 13.2 },
            { "d": 100, "v": 0.57, "i": 7.30 },
            { "d": 125, "v": 0.36, "i": 2.44 },
            { "d": 150, "v": 0.25, "i": 1.04 }
        ]
    },
    {
        "Q": 4.9,
        "values": [
            { "d": 50, "v": 2.31, "i": 266.0 },
            { "d": 70, "v": 1.41, "i": 72.2 },
            { "d": 80, "v": 0.99, "i": 28.8 },
            { "d": 90, "v": 0.73, "i": 13.7 },
            { "d": 100, "v": 0.58, "i": 7.58 },
            { "d": 125, "v": 0.37, "i": 2.53 },
            { "d": 150, "v": 0.26, "i": 1.08 }
        ]
    },
    {
        "Q": 5.0,
        "values": [
            { "d": 50, "v": 2.35, "i": 277.0 },
            { "d": 70, "v": 1.44, "i": 75.2 },
            { "d": 80, "v": 1.01, "i": 29.9 },
            { "d": 90, "v": 0.75, "i": 14.2 },
            { "d": 100, "v": 0.59, "i": 7.86 },
            { "d": 125, "v": 0.37, "i": 2.63 },
            { "d": 150, "v": 0.265, "i": 1.12 }
        ]
    },
    {
        "Q": 5.1,
        "values": [
            { "d": 50, "v": 2.40, "i": 288.2 },
            { "d": 70, "v": 1.47, "i": 78.3 },
            { "d": 80, "v": 1.03, "i": 31.1 },
            { "d": 90, "v": 0.76, "i": 14.7 },
            { "d": 100, "v": 0.60, "i": 8.15 },
            { "d": 125, "v": 0.38, "i": 2.72 },
            { "d": 150, "v": 0.27, "i": 1.16 }
        ]
    },
    {
        "Q": 5.2,
        "values": [
            { "d": 50, "v": 2.45, "i": 299.6 },
            { "d": 70, "v": 1.50, "i": 81.4 },
            { "d": 80, "v": 1.05, "i": 32.2 },
            { "d": 90, "v": 0.78, "i": 15.3 },
            { "d": 100, "v": 0.61, "i": 8.44 },
            { "d": 125, "v": 0.39, "i": 2.82 },
            { "d": 150, "v": 0.276, "i": 1.20 }
        ]
    },
    {
        "Q": 5.3,
        "values": [
            { "d": 50, "v": 2.50, "i": 311.2 },
            { "d": 70, "v": 1.53, "i": 84.5 },
            { "d": 80, "v": 1.07, "i": 33.4 },
            { "d": 90, "v": 0.79, "i": 15.8 },
            { "d": 100, "v": 0.62, "i": 8.74 },
            { "d": 125, "v": 0.399, "i": 2.92 },
            { "d": 150, "v": 0.28, "i": 1.24 }
        ]
    },
    {
        "Q": 5.4,
        "values": [
            { "d": 50, "v": 2.54, "i": 323.1 },
            { "d": 70, "v": 1.55, "i": 87.7 },
            { "d": 80, "v": 1.09, "i": 34.6 },
            { "d": 90, "v": 0.81, "i": 16.4 },
            { "d": 100, "v": 0.64, "i": 9.05 },
            { "d": 125, "v": 0.407, "i": 3.02 },
            { "d": 150, "v": 0.286, "i": 1.28 }
        ]
    },
    {
        "Q": 5.5,
        "values": [
            { "d": 50, "v": 2.59, "i": 335.1 },
            { "d": 70, "v": 1.58, "i": 91.0 },
            { "d": 80, "v": 1.11, "i": 35.8 },
            { "d": 90, "v": 0.82, "i": 16.9 },
            { "d": 100, "v": 0.65, "i": 9.36 },
            { "d": 125, "v": 0.41, "i": 3.12 },
            { "d": 150, "v": 0.29, "i": 1.32 }
        ]
    },
    {
        "Q": 5.6,
        "values": [
            { "d": 50, "v": 2.64, "i": 347.4 },
            { "d": 70, "v": 1.61, "i": 94.3 },
            { "d": 80, "v": 1.13, "i": 37.0 },
            { "d": 90, "v": 0.84, "i": 17.5 },
            { "d": 100, "v": 0.66, "i": 9.67 },
            { "d": 125, "v": 0.42, "i": 3.22 },
            { "d": 150, "v": 0.297, "i": 1.37 }
        ]
    },
    {
        "Q": 5.7,
        "values": [
            { "d": 50, "v": 2.68, "i": 359.9 },
            { "d": 70, "v": 1.64, "i": 97.7 },
            { "d": 80, "v": 1.15, "i": 38.2 },
            { "d": 90, "v": 0.85, "i": 18.1 },
            { "d": 100, "v": 0.67, "i": 9.99 },
            { "d": 125, "v": 0.43, "i": 3.32 },
            { "d": 150, "v": 0.30, "i": 1.41 }
        ]
    },
    {
        "Q": 5.8,
        "values": [
            { "d": 50, "v": 2.73, "i": 372.7 },
            { "d": 70, "v": 1.67, "i": 101.2 },
            { "d": 80, "v": 1.17, "i": 39.5 },
            { "d": 90, "v": 0.87, "i": 18.7 },
            { "d": 100, "v": 0.68, "i": 10.3 },
            { "d": 125, "v": 0.437, "i": 3.43 },
            { "d": 150, "v": 0.307, "i": 1.45 }
        ]
    },
    {
        "Q": 5.9,
        "values": [
            { "d": 50, "v": 2.78, "i": 385.7 },
            { "d": 70, "v": 1.70, "i": 104.7 },
            { "d": 80, "v": 1.19, "i": 40.8 },
            { "d": 90, "v": 0.88, "i": 19.3 },
            { "d": 100, "v": 0.69, "i": 10.6 },
            { "d": 125, "v": 0.445, "i": 3.54 },
            { "d": 150, "v": 0.31, "i": 1.50 }
        ]
    },
    {
        "Q": 6.0,
        "values": [
            { "d": 50, "v": 2.83, "i": 398.8 },
            { "d": 70, "v": 1.73, "i": 108.3 },
            { "d": 80, "v": 1.21, "i": 42.0 },
            { "d": 90, "v": 0.90, "i": 19.9 },
            { "d": 100, "v": 0.71, "i": 11.0 },
            { "d": 125, "v": 0.45, "i": 3.65 },
            { "d": 150, "v": 0.318, "i": 1.54 }
        ]
    },
    {
        "Q": 6.1,
        "values": [
            { "d": 50, "v": 2.87, "i": 412.2 },
            { "d": 70, "v": 1.76, "i": 112.0 },
            { "d": 80, "v": 1.23, "i": 43.4 },
            { "d": 90, "v": 0.91, "i": 20.5 },
            { "d": 100, "v": 0.72, "i": 11.3 },
            { "d": 125, "v": 0.46, "i": 3.76 },
            { "d": 150, "v": 0.32, "i": 1.60 }
        ]
    },
    {
        "Q": 6.2,
        "values": [
            { "d": 50, "v": 2.92, "i": 425.9 },
            { "d": 70, "v": 1.79, "i": 115.7 },
            { "d": 80, "v": 1.25, "i": 44.9 },
            { "d": 90, "v": 0.93, "i": 21.1 },
            { "d": 100, "v": 0.73, "i": 11.7 },
            { "d": 125, "v": 0.467, "i": 3.87 },
            { "d": 150, "v": 0.329, "i": 1.64 }
        ]
    },
    {
        "Q": 6.3,
        "values": [
            { "d": 50, "v": 2.97, "i": 439.7 },
            { "d": 70, "v": 1.81, "i": 119.4 },
            { "d": 80, "v": 1.27, "i": 46.3 },
            { "d": 90, "v": 0.94, "i": 21.8 },
            { "d": 100, "v": 0.74, "i": 12.0 },
            { "d": 125, "v": 0.475, "i": 3.98 },
            { "d": 150, "v": 0.33, "i": 1.68 }
        ]
    },
    {
        "Q": 6.4,
        "values": [
            { "d": 50, "v": 3.01, "i": 453.8 },
            { "d": 70, "v": 1.84, "i": 123.2 },
            { "d": 80, "v": 1.29, "i": 47.8 },
            { "d": 90, "v": 0.96, "i": 22.4 },
            { "d": 100, "v": 0.75, "i": 12.4 },
            { "d": 125, "v": 0.48, "i": 4.10 },
            { "d": 150, "v": 0.339, "i": 1.73 }
        ]
    },
    {
        "Q": 6.5,
        "values": [
            { "d": 70, "v": 1.87, "i": 127.1 },
            { "d": 80, "v": 1.31, "i": 49.3 },
            { "d": 90, "v": 0.97, "i": 23.1 },
            { "d": 100, "v": 0.77, "i": 12.7 },
            { "d": 125, "v": 0.49, "i": 4.21 },
            { "d": 150, "v": 0.34, "i": 1.78 }
        ]
    },
    {
        "Q": 6.6,
        "values": [
            { "d": 70, "v": 1.90, "i": 131.1 },
            { "d": 80, "v": 1.33, "i": 50.8 },
            { "d": 90, "v": 0.99, "i": 23.7 },
            { "d": 100, "v": 0.78, "i": 13.1 },
            { "d": 125, "v": 0.498, "i": 4.33 },
            { "d": 150, "v": 0.35, "i": 1.83 }
        ]
    },
    {
        "Q": 6.7,
        "values": [
            { "d": 70, "v": 1.93, "i": 135.1 },
            { "d": 80, "v": 1.35, "i": 52.4 },
            { "d": 90, "v": 1.00, "i": 24.4 },
            { "d": 100, "v": 0.79, "i": 13.4 },
            { "d": 125, "v": 0.505, "i": 4.45 },
            { "d": 150, "v": 0.355, "i": 1.88 }
        ]
    },
    {
        "Q": 6.8,
        "values": [
            { "d": 70, "v": 1.96, "i": 139.1 },
            { "d": 80, "v": 1.37, "i": 54.0 },
            { "d": 90, "v": 1.02, "i": 25.1 },
            { "d": 100, "v": 0.80, "i": 13.8 },
            { "d": 125, "v": 0.51, "i": 4.57 },
            { "d": 150, "v": 0.36, "i": 1.93 }
        ]
    },
    {
        "Q": 6.9,
        "values": [
            { "d": 70, "v": 1.99, "i": 143.2 },
            { "d": 80, "v": 1.39, "i": 55.6 },
            { "d": 90, "v": 1.03, "i": 25.8 },
            { "d": 100, "v": 0.81, "i": 14.2 },
            { "d": 125, "v": 0.52, "i": 4.69 },
            { "d": 150, "v": 0.366, "i": 1.98 }
        ]
    },
    {
        "Q": 7.0,
        "values": [
            { "d": 70, "v": 2.02, "i": 147.4 },
            { "d": 80, "v": 1.41, "i": 57.2 },
            { "d": 90, "v": 1.05, "i": 26.5 },
            { "d": 100, "v": 0.82, "i": 14.6 },
            { "d": 125, "v": 0.527, "i": 4.82 },
            { "d": 150, "v": 0.37, "i": 2.03 }
        ]
    },
    {
        "Q": 7.1,
        "values": [
            { "d": 70, "v": 2.04, "i": 151.7 },
            { "d": 80, "v": 1.43, "i": 58.8 },
            { "d": 90, "v": 1.06, "i": 27.2 },
            { "d": 100, "v": 0.84, "i": 15.0 },
            { "d": 125, "v": 0.535, "i": 4.94 },
            { "d": 150, "v": 0.376, "i": 2.09 }
        ]
    },
    {
        "Q": 7.2,
        "values": [
            { "d": 70, "v": 2.07, "i": 156.0 },
            { "d": 80, "v": 1.45, "i": 60.5 },
            { "d": 90, "v": 1.08, "i": 27.9 },
            { "d": 100, "v": 0.85, "i": 15.3 },
            { "d": 125, "v": 0.54, "i": 5.07 },
            { "d": 150, "v": 0.38, "i": 2.14 }
        ]
    },
    {
        "Q": 7.3,
        "values": [
            { "d": 70, "v": 2.10, "i": 160.3 },
            { "d": 80, "v": 1.47, "i": 62.2 },
            { "d": 90, "v": 1.09, "i": 28.6 },
            { "d": 100, "v": 0.86, "i": 15.7 },
            { "d": 125, "v": 0.55, "i": 5.20 },
            { "d": 150, "v": 0.387, "i": 2.19 }
        ]
    },
    {
        "Q": 7.4,
        "values": [
            { "d": 70, "v": 2.13, "i": 164.8 },
            { "d": 80, "v": 1.49, "i": 63.9 },
            { "d": 90, "v": 1.11, "i": 29.4 },
            { "d": 100, "v": 0.87, "i": 16.1 },
            { "d": 125, "v": 0.558, "i": 5.33 },
            { "d": 150, "v": 0.39, "i": 2.24 }
        ]
    },
    {
        "Q": 7.5,
        "values": [
            { "d": 70, "v": 2.16, "i": 169.2 },
            { "d": 80, "v": 1.51, "i": 65.6 },
            { "d": 90, "v": 1.12, "i": 30.1 },
            { "d": 100, "v": 0.88, "i": 16.6 },
            { "d": 125, "v": 0.565, "i": 5.46 },
            { "d": 150, "v": 0.397, "i": 2.30 }
        ]
    },
    {
        "Q": 7.6,
        "values": [
            { "d": 70, "v": 2.19, "i": 173.8 },
            { "d": 80, "v": 1.53, "i": 67.4 },
            { "d": 90, "v": 1.14, "i": 30.9 },
            { "d": 100, "v": 0.89, "i": 17.0 },
            { "d": 125, "v": 0.57, "i": 5.59 },
            { "d": 150, "v": 0.40, "i": 2.36 }
        ]
    },
    {
        "Q": 7.7,
        "values": [
            { "d": 70, "v": 2.22, "i": 178.4 },
            { "d": 80, "v": 1.55, "i": 69.2 },
            { "d": 90, "v": 1.15, "i": 31.6 },
            { "d": 100, "v": 0.91, "i": 17.4 },
            { "d": 125, "v": 0.58, "i": 5.73 },
            { "d": 150, "v": 0.408, "i": 2.41 }
        ]
    },
    {
        "Q": 7.8,
        "values": [
            { "d": 70, "v": 2.25, "i": 183.0 },
            { "d": 80, "v": 1.57, "i": 71.0 },
            { "d": 90, "v": 1.17, "i": 32.4 },
            { "d": 100, "v": 0.92, "i": 17.8 },
            { "d": 125, "v": 0.595, "i": 5.86 },
            { "d": 150, "v": 0.41, "i": 2.47 }
        ]
    },
    {
        "Q": 7.9,
        "values": [
            { "d": 70, "v": 2.27, "i": 187.8 },
            { "d": 80, "v": 1.59, "i": 72.8 },
            { "d": 90, "v": 1.18, "i": 33.2 },
            { "d": 100, "v": 0.93, "i": 18.2 },
            { "d": 125, "v": 0.60, "i": 6.00 },
            { "d": 150, "v": 0.419, "i": 2.53 }
        ]
    },
    {
        "Q": 8.0,
        "values": [
            { "d": 70, "v": 2.30, "i": 192.6 },
            { "d": 80, "v": 1.61, "i": 74.7 },
            { "d": 90, "v": 1.20, "i": 34.0 },
            { "d": 100, "v": 0.94, "i": 18.7 },
            { "d": 125, "v": 0.60, "i": 6.14 },
            { "d": 150, "v": 0.42, "i": 2.58 }
        ]
    },
    {
        "Q": 8.1,
        "values": [
            { "d": 70, "v": 2.33, "i": 197.4 },
            { "d": 80, "v": 1.63, "i": 76.6 },
            { "d": 90, "v": 1.21, "i": 34.7 },
            { "d": 100, "v": 0.95, "i": 19.1 },
            { "d": 125, "v": 0.61, "i": 6.28 },
            { "d": 150, "v": 0.429, "i": 2.64 }
        ]
    },
    {
        "Q": 8.2,
        "values": [
            { "d": 70, "v": 2.36, "i": 202.3 },
            { "d": 80, "v": 1.65, "i": 78.5 },
            { "d": 90, "v": 1.23, "i": 35.6 },
            { "d": 100, "v": 0.97, "i": 19.5 },
            { "d": 125, "v": 0.618, "i": 6.42 },
            { "d": 150, "v": 0.435, "i": 2.70 }
        ]
    },
    {
        "Q": 8.3,
        "values": [
            { "d": 70, "v": 2.40, "i": 207.3 },
            { "d": 80, "v": 1.67, "i": 80.4 },
            { "d": 90, "v": 1.24, "i": 36.5 },
            { "d": 100, "v": 0.98, "i": 20.0 },
            { "d": 125, "v": 0.625, "i": 6.57 },
            { "d": 150, "v": 0.44, "i": 2.76 }
        ]
    },
    {
        "Q": 8.4,
        "values": [
            { "d": 70, "v": 2.42, "i": 212.3 },
            { "d": 80, "v": 1.69, "i": 82.3 },
            { "d": 90, "v": 1.26, "i": 37.3 },
            { "d": 100, "v": 0.99, "i": 20.4 },
            { "d": 125, "v": 0.63, "i": 6.71 },
            { "d": 150, "v": 0.445, "i": 2.82 }
        ]
    },
    {
        "Q": 8.5,
        "values": [
            { "d": 70, "v": 2.45, "i": 217.4 },
            { "d": 80, "v": 1.71, "i": 84.3 },
            { "d": 90, "v": 1.27, "i": 38.2 },
            { "d": 100, "v": 1.00, "i": 20.9 },
            { "d": 125, "v": 0.64, "i": 6.86 },
            { "d": 150, "v": 0.45, "i": 2.88 }
        ]
    },
    {
        "Q": 8.6,
        "values": [
            { "d": 70, "v": 2.48, "i": 222.5 },
            { "d": 80, "v": 1.73, "i": 86.3 },
            { "d": 90, "v": 1.29, "i": 39.1 },
            { "d": 100, "v": 1.01, "i": 21.3 },
            { "d": 125, "v": 0.648, "i": 7.01 },
            { "d": 150, "v": 0.456, "i": 2.94 }
        ]
    },
    {
        "Q": 8.7,
        "values": [
            { "d": 70, "v": 2.50, "i": 227.7 },
            { "d": 80, "v": 1.75, "i": 88.3 },
            { "d": 90, "v": 1.30, "i": 40.1 },
            { "d": 100, "v": 1.02, "i": 21.8 },
            { "d": 125, "v": 0.655, "i": 7.16 },
            { "d": 150, "v": 0.46, "i": 3.01 }
        ]
    },
    {
        "Q": 8.8,
        "values": [
            { "d": 70, "v": 2.53, "i": 233.0 },
            { "d": 80, "v": 1.77, "i": 90.4 },
            { "d": 90, "v": 1.32, "i": 41.0 },
            { "d": 100, "v": 1.04, "i": 22.3 },
            { "d": 125, "v": 0.66, "i": 7.31 },
            { "d": 150, "v": 0.466, "i": 3.07 }
        ]
    },
    {
        "Q": 8.9,
        "values": [
            { "d": 70, "v": 2.56, "i": 238.3 },
            { "d": 80, "v": 1.79, "i": 92.4 },
            { "d": 90, "v": 1.33, "i": 41.9 },
            { "d": 100, "v": 1.05, "i": 22.7 },
            { "d": 125, "v": 0.67, "i": 7.46 },
            { "d": 150, "v": 0.47, "i": 3.13 }
        ]
    },
    {
        "Q": 9.0,
        "values": [
            { "d": 70, "v": 2.59, "i": 243.7 },
            { "d": 80, "v": 1.81, "i": 94.5 },
            { "d": 90, "v": 1.35, "i": 42.9 },
            { "d": 100, "v": 1.06, "i": 23.2 },
            { "d": 125, "v": 0.678, "i": 7.62 },
            { "d": 150, "v": 0.477, "i": 3.20 }
        ]
    },
    {
        "Q": 9.1,
        "values": [
            { "d": 70, "v": 2.62, "i": 249.1 },
            { "d": 80, "v": 1.83, "i": 96.6 },
            { "d": 90, "v": 1.36, "i": 43.8 },
            { "d": 100, "v": 1.07, "i": 23.7 },
            { "d": 125, "v": 0.686, "i": 7.77 },
            { "d": 150, "v": 0.48, "i": 3.26 }
        ]
    },
    {
        "Q": 9.2,
        "values": [
            { "d": 70, "v": 2.65, "i": 254.6 },
            { "d": 80, "v": 1.85, "i": 98.8 },
            { "d": 90, "v": 1.37, "i": 44.8 },
            { "d": 100, "v": 1.08, "i": 24.2 },
            { "d": 125, "v": 0.69, "i": 7.93 },
            { "d": 150, "v": 0.488, "i": 3.32 }
        ]
    },
    {
        "Q": 9.3,
        "values": [
            { "d": 70, "v": 2.68, "i": 260.2 },
            { "d": 80, "v": 1.87, "i": 100.9 },
            { "d": 90, "v": 1.39, "i": 45.8 },
            { "d": 100, "v": 1.09, "i": 24.7 },
            { "d": 125, "v": 0.70, "i": 8.09 },
            { "d": 150, "v": 0.49, "i": 3.39 }
        ]
    },
    {
        "Q": 9.4,
        "values": [
            { "d": 70, "v": 2.71, "i": 265.8 },
            { "d": 80, "v": 1.89, "i": 103.1 },
            { "d": 90, "v": 1.40, "i": 46.8 },
            { "d": 100, "v": 1.11, "i": 25.2 },
            { "d": 125, "v": 0.708, "i": 8.25 },
            { "d": 150, "v": 0.498, "i": 3.46 }
        ]
    },
    {
        "Q": 9.5,
        "values": [
            { "d": 70, "v": 2.74, "i": 271.5 },
            { "d": 80, "v": 1.91, "i": 105.3 },
            { "d": 90, "v": 1.42, "i": 47.8 },
            { "d": 100, "v": 1.12, "i": 25.7 },
            { "d": 125, "v": 0.716, "i": 8.41 },
            { "d": 150, "v": 0.50, "i": 3.52 }
        ]
    },
    {
        "Q": 9.6,
        "values": [
            { "d": 70, "v": 2.76, "i": 277.3 },
            { "d": 80, "v": 1.93, "i": 107.6 },
            { "d": 90, "v": 1.43, "i": 48.8 },
            { "d": 100, "v": 1.13, "i": 26.2 },
            { "d": 125, "v": 0.72, "i": 8.57 },
            { "d": 150, "v": 0.509, "i": 3.59 }
        ]
    },
    {
        "Q": 9.7,
        "values": [
            { "d": 70, "v": 2.79, "i": 283.1 },
            { "d": 80, "v": 1.95, "i": 109.8 },
            { "d": 90, "v": 1.45, "i": 49.8 },
            { "d": 100, "v": 1.14, "i": 26.7 },
            { "d": 125, "v": 0.73, "i": 8.74 },
            { "d": 150, "v": 0.51, "i": 3.66 }
        ]
    },
    {
        "Q": 9.8,
        "values": [
            { "d": 70, "v": 2.82, "i": 288.9 },
            { "d": 80, "v": 1.97, "i": 112.1 },
            { "d": 90, "v": 1.46, "i": 50.8 },
            { "d": 100, "v": 1.15, "i": 27.2 },
            { "d": 125, "v": 0.738, "i": 8.90 },
            { "d": 150, "v": 0.52, "i": 3.73 }
        ]
    },
    {
        "Q": 9.9,
        "values": [
            { "d": 70, "v": 2.85, "i": 294.9 },
            { "d": 80, "v": 1.99, "i": 114.4 },
            { "d": 90, "v": 1.48, "i": 51.9 },
            { "d": 100, "v": 1.17, "i": 27.8 },
            { "d": 125, "v": 0.746, "i": 9.07 },
            { "d": 150, "v": 0.525, "i": 3.80 }
        ]
    },
    {
        "Q": 10.0,
        "values": [
            { "d": 70, "v": 2.88, "i": 300.9 },
            { "d": 80, "v": 2.01, "i": 116.7 },
            { "d": 90, "v": 1.49, "i": 52.9 },
            { "d": 100, "v": 1.18, "i": 28.3 },
            { "d": 125, "v": 0.75, "i": 9.24 },
            { "d": 150, "v": 0.53, "i": 3.87 }
        ]
    }
];

const npToAlphaTable = [
    // Первая часть (0.000 - 0.050)
    { np: 0.000, alpha: 0.200 }, // Менее 0,015
    { np: 0.015, alpha: 0.202 }, { np: 0.016, alpha: 0.205 }, { np: 0.017, alpha: 0.207 },
    { np: 0.018, alpha: 0.210 }, { np: 0.019, alpha: 0.212 }, { np: 0.020, alpha: 0.215 },
    { np: 0.021, alpha: 0.217 }, { np: 0.022, alpha: 0.219 }, { np: 0.023, alpha: 0.222 },
    { np: 0.024, alpha: 0.224 }, { np: 0.025, alpha: 0.226 }, { np: 0.026, alpha: 0.228 },
    { np: 0.027, alpha: 0.230 }, { np: 0.028, alpha: 0.233 }, { np: 0.029, alpha: 0.235 },
    { np: 0.030, alpha: 0.237 }, { np: 0.031, alpha: 0.239 }, { np: 0.032, alpha: 0.241 },
    { np: 0.033, alpha: 0.243 }, { np: 0.034, alpha: 0.245 }, { np: 0.035, alpha: 0.247 },
    { np: 0.036, alpha: 0.249 }, { np: 0.037, alpha: 0.250 }, { np: 0.038, alpha: 0.252 },
    { np: 0.039, alpha: 0.254 }, { np: 0.040, alpha: 0.256 }, { np: 0.041, alpha: 0.258 },
    { np: 0.042, alpha: 0.259 }, { np: 0.043, alpha: 0.261 }, { np: 0.044, alpha: 0.263 },
    { np: 0.045, alpha: 0.265 }, { np: 0.046, alpha: 0.266 }, { np: 0.047, alpha: 0.268 },
    { np: 0.048, alpha: 0.270 }, { np: 0.049, alpha: 0.271 }, { np: 0.050, alpha: 0.273 },

    // Вторая часть (0.052 - 1.60)
    { np: 0.052, alpha: 0.276 }, { np: 0.054, alpha: 0.280 }, { np: 0.056, alpha: 0.283 },
    { np: 0.058, alpha: 0.286 }, { np: 0.060, alpha: 0.289 }, { np: 0.062, alpha: 0.292 },
    { np: 0.064, alpha: 0.295 }, { np: 0.065, alpha: 0.298 }, { np: 0.068, alpha: 0.301 },
    { np: 0.070, alpha: 0.304 }, { np: 0.072, alpha: 0.307 }, { np: 0.074, alpha: 0.309 },
    { np: 0.076, alpha: 0.312 }, { np: 0.078, alpha: 0.315 }, { np: 0.080, alpha: 0.318 },
    { np: 0.082, alpha: 0.320 }, { np: 0.084, alpha: 0.323 }, { np: 0.086, alpha: 0.326 },
    { np: 0.088, alpha: 0.328 }, { np: 0.090, alpha: 0.331 }, { np: 0.092, alpha: 0.333 },
    { np: 0.094, alpha: 0.336 }, { np: 0.096, alpha: 0.338 }, { np: 0.098, alpha: 0.341 },
    { np: 0.100, alpha: 0.343 }, { np: 0.105, alpha: 0.349 }, { np: 0.110, alpha: 0.355 },
    { np: 0.115, alpha: 0.361 }, { np: 0.120, alpha: 0.367 }, { np: 0.125, alpha: 0.373 },
    { np: 0.130, alpha: 0.378 }, { np: 0.135, alpha: 0.384 }, { np: 0.140, alpha: 0.389 },
    { np: 0.145, alpha: 0.394 }, { np: 0.150, alpha: 0.399 }, { np: 0.155, alpha: 0.405 },
    { np: 0.160, alpha: 0.410 }, { np: 0.165, alpha: 0.415 }, { np: 0.170, alpha: 0.420 },
    { np: 0.175, alpha: 0.425 }, { np: 0.180, alpha: 0.430 }, { np: 0.185, alpha: 0.435 },
    { np: 0.190, alpha: 0.439 }, { np: 0.195, alpha: 0.444 }, { np: 0.200, alpha: 0.449 },
    { np: 0.210, alpha: 0.458 }, { np: 0.220, alpha: 0.467 }, { np: 0.230, alpha: 0.476 },
    { np: 0.240, alpha: 0.485 }, { np: 0.250, alpha: 0.493 }, { np: 0.260, alpha: 0.502 },
    { np: 0.270, alpha: 0.510 }, { np: 0.280, alpha: 0.518 }, { np: 0.290, alpha: 0.526 },
    { np: 0.300, alpha: 0.534 }, { np: 0.310, alpha: 0.542 }, { np: 0.320, alpha: 0.550 },
    { np: 0.330, alpha: 0.558 }, { np: 0.340, alpha: 0.565 }, { np: 0.350, alpha: 0.573 },
    { np: 0.360, alpha: 0.580 }, { np: 0.370, alpha: 0.588 }, { np: 0.380, alpha: 0.595 },
    { np: 0.390, alpha: 0.602 }, { np: 0.400, alpha: 0.610 }, { np: 0.410, alpha: 0.617 },
    { np: 0.420, alpha: 0.624 }, { np: 0.430, alpha: 0.631 }, { np: 0.440, alpha: 0.638 },
    { np: 0.450, alpha: 0.645 }, { np: 0.460, alpha: 0.652 }, { np: 0.470, alpha: 0.658 },
    { np: 0.480, alpha: 0.665 }, { np: 0.490, alpha: 0.672 }, { np: 0.500, alpha: 0.678 },
    { np: 0.520, alpha: 0.692 }, { np: 0.540, alpha: 0.704 }, { np: 0.560, alpha: 0.717 },
    { np: 0.580, alpha: 0.730 }, { np: 0.600, alpha: 0.742 }, { np: 0.620, alpha: 0.755 },
    { np: 0.640, alpha: 0.767 }, { np: 0.660, alpha: 0.779 }, { np: 0.680, alpha: 0.791 },
    { np: 0.700, alpha: 0.803 }, { np: 0.720, alpha: 0.815 }, { np: 0.740, alpha: 0.826 },
    { np: 0.760, alpha: 0.838 }, { np: 0.780, alpha: 0.849 }, { np: 0.800, alpha: 0.860 },
    { np: 0.820, alpha: 0.872 }, { np: 0.840, alpha: 0.883 }, { np: 0.860, alpha: 0.894 },
    { np: 0.880, alpha: 0.905 }, { np: 0.900, alpha: 0.916 }, { np: 0.920, alpha: 0.927 },
    { np: 0.940, alpha: 0.937 }, { np: 0.960, alpha: 0.948 }, { np: 0.980, alpha: 0.959 },
    { np: 1.000, alpha: 0.969 }, { np: 1.050, alpha: 0.995 }, { np: 1.100, alpha: 1.021 },
    { np: 1.150, alpha: 1.046 }, { np: 1.200, alpha: 1.071 }, { np: 1.250, alpha: 1.096 },
    { np: 1.300, alpha: 1.120 }, { np: 1.350, alpha: 1.144 }, { np: 1.400, alpha: 1.168 },
    { np: 1.450, alpha: 1.191 }, { np: 1.500, alpha: 1.215 }, { np: 1.550, alpha: 1.238 },
    { np: 1.600, alpha: 1.261 },

    // Третья часть (1.65 - 8.6)
    { np: 1.650, alpha: 1.283 }, { np: 1.700, alpha: 1.306 }, { np: 1.750, alpha: 1.328 },
    { np: 1.800, alpha: 1.350 }, { np: 1.850, alpha: 1.372 }, { np: 1.900, alpha: 1.394 },
    { np: 1.950, alpha: 1.416 }, { np: 2.000, alpha: 1.437 }, { np: 2.100, alpha: 1.479 },
    { np: 2.200, alpha: 1.521 }, { np: 2.300, alpha: 1.563 }, { np: 2.400, alpha: 1.604 },
    { np: 2.500, alpha: 1.644 }, { np: 2.600, alpha: 1.684 }, { np: 2.700, alpha: 1.724 },
    { np: 2.800, alpha: 1.763 }, { np: 2.900, alpha: 1.802 }, { np: 3.000, alpha: 1.840 },
    { np: 3.100, alpha: 1.879 }, { np: 3.200, alpha: 1.917 }, { np: 3.300, alpha: 1.954 },
    { np: 3.400, alpha: 1.991 }, { np: 3.500, alpha: 2.029 }, { np: 3.600, alpha: 2.065 },
    { np: 3.700, alpha: 2.102 }, { np: 3.800, alpha: 2.138 }, { np: 3.900, alpha: 2.174 },
    { np: 4.000, alpha: 2.210 }, { np: 4.100, alpha: 2.246 }, { np: 4.200, alpha: 2.281 },
    { np: 4.300, alpha: 2.317 }, { np: 4.400, alpha: 2.352 }, { np: 4.500, alpha: 2.386 },
    { np: 4.600, alpha: 2.421 }, { np: 4.700, alpha: 2.456 }, { np: 4.800, alpha: 2.490 },
    { np: 4.900, alpha: 2.524 }, { np: 5.000, alpha: 2.558 }, { np: 5.100, alpha: 2.592 },
    { np: 5.200, alpha: 2.626 }, { np: 5.300, alpha: 2.660 }, { np: 5.400, alpha: 2.693 },
    { np: 5.500, alpha: 2.726 }, { np: 5.600, alpha: 2.760 }, { np: 5.700, alpha: 2.793 },
    { np: 5.800, alpha: 2.826 }, { np: 5.900, alpha: 2.858 }, { np: 6.000, alpha: 2.891 },
    { np: 6.100, alpha: 2.924 }, { np: 6.200, alpha: 2.956 }, { np: 6.300, alpha: 2.989 },
    { np: 6.400, alpha: 3.021 }, { np: 6.500, alpha: 3.053 }, { np: 6.600, alpha: 3.085 },
    { np: 6.700, alpha: 3.117 }, { np: 6.800, alpha: 3.149 }, { np: 6.900, alpha: 3.181 },
    { np: 7.000, alpha: 3.212 }, { np: 7.100, alpha: 3.244 }, { np: 7.200, alpha: 3.275 },
    { np: 7.300, alpha: 3.307 }, { np: 7.400, alpha: 3.338 }, { np: 7.500, alpha: 3.369 },
    { np: 7.600, alpha: 3.400 }, { np: 7.700, alpha: 3.431 }, { np: 7.800, alpha: 3.462 },
    { np: 7.900, alpha: 3.493 }, { np: 8.000, alpha: 3.524 }, { np: 8.100, alpha: 3.555 },
    { np: 8.200, alpha: 3.585 }, { np: 8.300, alpha: 3.616 }, { np: 8.400, alpha: 3.646 },
    { np: 8.500, alpha: 3.677 }, { np: 8.600, alpha: 3.707 },

    // Четвертая часть (8.7 - 80)
    { np: 8.700, alpha: 3.738 }, { np: 8.800, alpha: 3.768 }, { np: 8.900, alpha: 3.798 },
    { np: 9.000, alpha: 3.828 }, { np: 9.100, alpha: 3.858 }, { np: 9.200, alpha: 3.888 },
    { np: 9.300, alpha: 3.918 }, { np: 9.400, alpha: 3.948 }, { np: 9.500, alpha: 3.978 },
    { np: 9.600, alpha: 4.008 }, { np: 9.700, alpha: 4.037 }, { np: 9.800, alpha: 4.067 },
    { np: 9.900, alpha: 4.097 }, { np: 10.000, alpha: 4.126 }, { np: 10.200, alpha: 4.185 },
    { np: 10.400, alpha: 4.244 }, { np: 10.600, alpha: 4.302 }, { np: 10.800, alpha: 4.361 },
    { np: 11.000, alpha: 4.419 }, { np: 11.200, alpha: 4.477 }, { np: 11.400, alpha: 4.534 },
    { np: 11.600, alpha: 4.592 }, { np: 11.800, alpha: 4.649 }, { np: 12.000, alpha: 4.707 },
    { np: 12.200, alpha: 4.764 }, { np: 12.400, alpha: 4.820 }, { np: 12.600, alpha: 4.877 },
    { np: 12.800, alpha: 4.934 }, { np: 13.000, alpha: 4.990 }, { np: 13.200, alpha: 5.047 },
    { np: 13.400, alpha: 5.103 }, { np: 13.600, alpha: 5.159 }, { np: 13.800, alpha: 5.215 },
    { np: 14.000, alpha: 5.270 }, { np: 14.200, alpha: 5.326 }, { np: 14.400, alpha: 5.382 },
    { np: 14.600, alpha: 5.437 }, { np: 14.800, alpha: 5.492 }, { np: 15.000, alpha: 5.547 },
    { np: 15.200, alpha: 5.602 }, { np: 15.400, alpha: 5.657 }, { np: 15.600, alpha: 5.712 },
    { np: 15.800, alpha: 5.767 }, { np: 16.000, alpha: 5.821 }, { np: 16.200, alpha: 5.876 },
    { np: 16.400, alpha: 5.930 }, { np: 16.600, alpha: 5.984 }, { np: 16.800, alpha: 6.039 },
    { np: 17.000, alpha: 6.093 }, { np: 17.200, alpha: 6.147 }, { np: 17.400, alpha: 6.201 },
    { np: 17.600, alpha: 6.254 }, { np: 17.800, alpha: 6.308 }, { np: 18.000, alpha: 6.362 },
    { np: 18.200, alpha: 6.415 }, { np: 18.400, alpha: 6.469 }, { np: 18.600, alpha: 6.522 },
    { np: 18.800, alpha: 6.575 }, { np: 19.000, alpha: 6.629 }, { np: 19.200, alpha: 6.682 },
    { np: 19.400, alpha: 6.734 }, { np: 19.600, alpha: 6.788 }, { np: 19.800, alpha: 6.840 },
    { np: 20.000, alpha: 6.893 }, { np: 21.000, alpha: 7.156 }, { np: 21.500, alpha: 7.287 },
    { np: 22.000, alpha: 7.417 }, { np: 22.500, alpha: 7.547 }, { np: 23.000, alpha: 7.677 },
    { np: 23.500, alpha: 7.806 }, { np: 24.000, alpha: 7.935 }, { np: 24.500, alpha: 8.064 },
    { np: 25.000, alpha: 8.192 }, { np: 25.500, alpha: 8.320 }, { np: 26.000, alpha: 8.447 },
    { np: 26.500, alpha: 8.575 }, { np: 27.000, alpha: 8.701 }, { np: 27.500, alpha: 8.828 },
    { np: 28.000, alpha: 8.955 }, { np: 28.500, alpha: 9.081 }, { np: 29.000, alpha: 9.207 },
    { np: 29.500, alpha: 9.332 }, { np: 30.000, alpha: 9.457 }, { np: 30.500, alpha: 9.583 },
    { np: 31.000, alpha: 9.707 }, { np: 31.500, alpha: 9.832 }, { np: 32.000, alpha: 9.957 },
    { np: 32.500, alpha: 10.08 }, { np: 33.000, alpha: 10.20 }, { np: 33.500, alpha: 10.33 },
    { np: 34.000, alpha: 10.45 }, { np: 34.500, alpha: 10.58 }, { np: 35.000, alpha: 10.70 },
    { np: 35.500, alpha: 10.82 }, { np: 36.000, alpha: 10.94 }, { np: 36.500, alpha: 11.07 },
    { np: 37.500, alpha: 11.31 }, { np: 38.000, alpha: 11.43 }, { np: 38.500, alpha: 11.56 },
    { np: 39.000, alpha: 11.68 }, { np: 39.500, alpha: 11.80 }, { np: 40.000, alpha: 11.92 },
    { np: 40.500, alpha: 12.04 }, { np: 41.000, alpha: 12.16 }, { np: 41.500, alpha: 12.28 },
    { np: 42.000, alpha: 12.41 }, { np: 42.500, alpha: 12.53 }, { np: 43.000, alpha: 12.65 },
    { np: 43.500, alpha: 12.77 }, { np: 44.000, alpha: 12.89 }, { np: 44.500, alpha: 13.01 },
    { np: 45.000, alpha: 13.13 }, { np: 45.500, alpha: 13.25 }, { np: 46.000, alpha: 13.37 },
    { np: 46.500, alpha: 13.49 }, { np: 47.000, alpha: 13.61 }, { np: 47.500, alpha: 13.73 },
    { np: 48.000, alpha: 13.85 }, { np: 48.500, alpha: 13.97 }, { np: 49.000, alpha: 14.09 },
    { np: 49.500, alpha: 14.20 }, { np: 50.000, alpha: 14.32 }, { np: 51.000, alpha: 14.56 },
    { np: 52.000, alpha: 14.80 }, { np: 53.000, alpha: 15.04 }, { np: 54.000, alpha: 15.27 },
    { np: 55.000, alpha: 15.51 }, { np: 56.000, alpha: 15.74 }, { np: 57.000, alpha: 15.98 },
    { np: 58.000, alpha: 16.22 }, { np: 59.000, alpha: 16.45 }, { np: 60.000, alpha: 16.69 },
    { np: 61.000, alpha: 16.92 }, { np: 62.000, alpha: 17.15 }, { np: 63.000, alpha: 17.39 },
    { np: 64.000, alpha: 17.62 }, { np: 65.000, alpha: 17.85 }, { np: 66.000, alpha: 18.09 },
    { np: 67.000, alpha: 18.32 }, { np: 68.000, alpha: 18.55 }, { np: 69.000, alpha: 18.79 },
    { np: 70.000, alpha: 19.02 }, { np: 71.000, alpha: 19.25 }, { np: 72.000, alpha: 19.48 },
    { np: 73.000, alpha: 19.71 }, { np: 74.000, alpha: 19.94 }, { np: 75.000, alpha: 20.18 },
    { np: 76.000, alpha: 20.41 }, { np: 77.000, alpha: 20.64 }, { np: 78.000, alpha: 20.87 },
    { np: 79.000, alpha: 21.10 }, { np: 80.000, alpha: 21.33 },

    // Пятая часть (81 - 755)
    { np: 81.000, alpha: 21.56 }, { np: 82.000, alpha: 21.69 }, { np: 83.000, alpha: 22.02 },
    { np: 85.000, alpha: 22.48 }, { np: 86.000, alpha: 22.71 }, { np: 87.000, alpha: 22.94 },
    { np: 88.000, alpha: 23.17 }, { np: 89.000, alpha: 23.39 }, { np: 90.000, alpha: 23.62 },
    { np: 91.000, alpha: 23.85 }, { np: 92.000, alpha: 24.08 }, { np: 93.000, alpha: 24.31 },
    { np: 94.000, alpha: 24.54 }, { np: 95.000, alpha: 24.77 }, { np: 96.000, alpha: 24.99 },
    { np: 97.000, alpha: 25.22 }, { np: 98.000, alpha: 25.45 }, { np: 99.000, alpha: 25.68 },
    { np: 100.000, alpha: 25.91 }, { np: 102.000, alpha: 26.36 }, { np: 104.000, alpha: 26.82 },
    { np: 106.000, alpha: 27.27 }, { np: 108.000, alpha: 27.72 }, { np: 110.000, alpha: 28.18 },
    { np: 112.000, alpha: 28.63 }, { np: 114.000, alpha: 29.09 }, { np: 116.000, alpha: 29.54 },
    { np: 138.000, alpha: 34.51 }, { np: 140.000, alpha: 34.96 }, { np: 142.000, alpha: 35.41 },
    { np: 144.000, alpha: 35.86 }, { np: 146.000, alpha: 36.31 }, { np: 148.000, alpha: 36.76 },
    { np: 150.000, alpha: 37.21 }, { np: 152.000, alpha: 37.66 }, { np: 154.000, alpha: 38.11 },
    { np: 158.000, alpha: 39.01 }, { np: 160.000, alpha: 39.46 }, { np: 162.000, alpha: 39.91 },
    { np: 164.000, alpha: 40.35 }, { np: 166.000, alpha: 40.80 }, { np: 168.000, alpha: 41.25 },
    { np: 170.000, alpha: 41.70 }, { np: 172.000, alpha: 42.15 }, { np: 174.000, alpha: 42.60 },
    { np: 176.000, alpha: 43.05 }, { np: 178.000, alpha: 43.50 }, { np: 180.000, alpha: 43.95 },
    { np: 182.000, alpha: 44.40 }, { np: 184.000, alpha: 44.84 }, { np: 186.000, alpha: 45.29 },
    { np: 188.000, alpha: 45.74 }, { np: 190.000, alpha: 46.19 }, { np: 192.000, alpha: 46.64 },
    { np: 235.000, alpha: 56.10 }, { np: 240.000, alpha: 57.19 }, { np: 245.000, alpha: 58.29 },
    { np: 250.000, alpha: 59.38 }, { np: 255.000, alpha: 60.48 }, { np: 260.000, alpha: 61.57 },
    { np: 265.000, alpha: 62.66 }, { np: 270.000, alpha: 63.75 }, { np: 275.000, alpha: 64.85 },
    { np: 280.000, alpha: 65.94 }, { np: 285.000, alpha: 67.03 }, { np: 290.000, alpha: 68.12 },
    { np: 295.000, alpha: 69.20 }, { np: 300.000, alpha: 70.29 }, { np: 305.000, alpha: 71.38 },
    { np: 315.000, alpha: 73.55 }, { np: 320.000, alpha: 74.63 }, { np: 325.000, alpha: 75.72 },
    { np: 330.000, alpha: 76.80 }, { np: 335.000, alpha: 77.88 }, { np: 340.000, alpha: 78.96 },
    { np: 345.000, alpha: 80.04 }, { np: 350.000, alpha: 81.12 }, { np: 355.000, alpha: 82.20 },
    { np: 360.000, alpha: 83.28 }, { np: 365.000, alpha: 84.36 }, { np: 370.000, alpha: 85.44 },
    { np: 425.000, alpha: 97.27 }, { np: 430.000, alpha: 98.34 }, { np: 435.000, alpha: 99.41 },
    { np: 440.000, alpha: 100.49 }, { np: 445.000, alpha: 101.56 }, { np: 450.000, alpha: 102.63 },
    { np: 455.000, alpha: 103.70 }, { np: 460.000, alpha: 104.77 }, { np: 465.000, alpha: 105.84 },
    { np: 470.000, alpha: 106.91 }, { np: 475.000, alpha: 107.98 }, { np: 480.000, alpha: 109.05 },
    { np: 485.000, alpha: 110.11 }, { np: 490.000, alpha: 111.18 }, { np: 495.000, alpha: 112.25 },
    { np: 500.000, alpha: 113.32 }, { np: 505.000, alpha: 114.38 }, { np: 510.000, alpha: 115.45 },
    { np: 515.000, alpha: 116.52 }, { np: 520.000, alpha: 117.58 }, { np: 525.000, alpha: 118.65 },
    { np: 535.000, alpha: 120.78 }, { np: 540.000, alpha: 121.84 }, { np: 545.000, alpha: 122.91 },
    { np: 550.000, alpha: 123.97 }, { np: 555.000, alpha: 125.04 }, { np: 560.000, alpha: 126.10 },
    { np: 615.000, alpha: 137.78 }, { np: 620.000, alpha: 138.84 }, { np: 625.000, alpha: 139.90 },
    { np: 630.000, alpha: 140.96 }, { np: 635.000, alpha: 142.02 }, { np: 640.000, alpha: 143.08 },
    { np: 645.000, alpha: 144.14 }, { np: 650.000, alpha: 145.20 }, { np: 655.000, alpha: 146.25 },
    { np: 660.000, alpha: 147.31 }, { np: 665.000, alpha: 148.37 }, { np: 670.000, alpha: 149.43 },
    { np: 675.000, alpha: 150.49 }, { np: 685.000, alpha: 152.60 }, { np: 690.000, alpha: 153.66 },
    { np: 695.000, alpha: 154.72 }, { np: 700.000, alpha: 155.77 }, { np: 705.000, alpha: 156.83 },
    { np: 710.000, alpha: 157.89 }, { np: 715.000, alpha: 158.94 }, { np: 720.000, alpha: 160.00 },
    { np: 725.000, alpha: 161.06 }, { np: 730.000, alpha: 162.11 }, { np: 735.000, alpha: 163.17 },
    { np: 740.000, alpha: 164.22 }, { np: 745.000, alpha: 165.28 }, { np: 755.000, alpha: 167.39 }
];

// for (let i = 0.000; i <= 0.195; i += 0.001) {
//     let id = Number(i.toFixed(3));
//     console.log(id, findAlphaByNP(id));
// }
// for (let i = 0; i <= 755; i += 1) {
//     let id = Number(i.toFixed(3));
//     console.log(id, findAlphaByNP(id));
// }