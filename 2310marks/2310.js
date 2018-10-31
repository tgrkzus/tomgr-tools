const readFraction = (string, max) => {
    const value = string.trim() === "" ? 0 : parseFloat(string);
    if (isNaN(value)) {
        throw new Error("Invalid float");
    }
    if (value < 0 || value > max) {
        throw new Error("Float outside accepted range");
    }
    return value / max;
}
const getField = (id, max) => {
    const element = document.getElementById(id);
    try {
        const value = readFraction(element.value, max);
        element.classList.remove("invalid");
        return value;
    } catch (e) {
        element.classList.add("invalid");
        throw new Error(`${id}: ${e.message}`);
    }
}

const calculateCutoff = (assignmentMark, midsem, cutoff) => {
    const examNeed = Math.pow(cutoff,2) / assignmentMark;
    const finalOne = (examNeed - 0.15 * midsem) / 0.85;
    const finalTwo = (examNeed - 0.30 * midsem) / 0.7;
    
    return Math.min(finalOne, finalTwo);
}

const update = () => {
    const assignments = document.getElementById("assignments");
    const exams = document.getElementById("exams");
    const mark = document.getElementById("mark");
    const cutoffs = [0.20,0.45,0.50,0.65,0.75,0.85];

    try {
        const a1 = getField("a1", 50);
        const a2 = getField("a2", 50);
        const a3 = getField("a3", 50);
        const a4 = getField("a4", 50);
        const midsem = getField("midsem", 15);
        const finalexam = getField("final", 50);

        const assignmentMark = (a1 + a2 + a3 + a4) * 0.25;

        const examMarkOne = 0.3 * midsem + 0.7 * finalexam;
        const examMarkTwo = 0.15 * midsem + 0.85 * finalexam;

        const examMark = Math.max(examMarkOne, examMarkTwo);

        const courseMark = Math.sqrt(assignmentMark * examMark);

        assignments.innerHTML = (Math.floor(assignmentMark * 100) + "%");
        exams.innerHTML = (Math.floor(examMark * 100) + "%");
        mark.innerHTML = (Math.floor(courseMark * 100) + "%");
        
        for(let i = 2; i <= 7; i++) {
            const cutoff = document.getElementById("need" + i);
            const need = calculateCutoff(assignmentMark, midsem, cutoffs[i-2]);
            
            cutoff.innerHTML = (Math.ceil(need * 100) + "% (" +
                Math.ceil(need * 50) + "/50)");
        }
    } catch (e) {
        assignments.innerHTML = "";
        exams.innerHTML = "";
        mark.innerHTML = e.message;
    }
}

window.onload = update;
