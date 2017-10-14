function init() {
}

function update() {
    a1 = (document.getElementById("a1").value || 0) / 50;
    a2 = (document.getElementById("a2").value || 0) / 50;
    a3 = (document.getElementById("a3").value || 0) / 50;
    a4 = (document.getElementById("a4").value || 0) / 50;
    midsem = (document.getElementById("midsem").value || 0) / 15;
    finalexam = (document.getElementById("final").value || 0) / 50;

    assignmentMark = (a1 + a2 + a3 + a4) * 0.25;
    
    examMarkOne = 0.3 * midsem + 0.7 * finalexam;
    examMarkTwo = 0.15 * midsem + 0.85 * finalexam;

    var examMark;
    if (examMarkOne > examMarkTwo) {
        examMark = examMarkOne;
    }
    else {
        examMark = examMarkTwo;
    }

    mark = Math.sqrt(assignmentMark * examMark);
    document.getElementById("assignments").innerHTML = (assignmentMark * 100 + "%");
    document.getElementById("exams").innerHTML = (examMark * 100 + "%");
    document.getElementById("mark").innerHTML = (mark * 100 + "%");
}
