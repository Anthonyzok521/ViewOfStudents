const studentsTable = document.querySelector('#students-table');
const _alert = document.querySelector('.alert');
const alertWarning = document.querySelector('.alert-warning');
const btnClose = document.querySelector('.btn-close');
const btnCloseWarning = document.querySelector('.btn-warning-close');
const btnCloseForm1 = document.querySelector('.btn-close-form1');
const btnCloseForm2 = document.querySelector('.btn-close-form2');
const btnEdit = document.querySelector('#edit');
const modal = document.querySelector('.Modal');
const btnDelete = document.querySelector('#delete');
const btnConfirm = document.querySelector('#confirm');
const btnCancel = document.querySelector('#cancel');
const formGroup = document.querySelector('.modal');
const btnSend = document.querySelector('.btn-send');
const count = document.querySelector('#count');
const students = document.querySelectorAll('tr');
const payout = document.querySelectorAll('.pago');
const nopayout = document.querySelectorAll('.no-pago');

let studentsName;
let datas = [];

count.textContent = `Total de estudiantes: ${students.length} - Han pagado: ${pago.length} - Quedan debiendo: ${nopayout.length}`;

studentsTable.addEventListener('click', (e) => {
    if(e.target && e.target.tagName === 'TD') {
        if(_alert.style.display === 'none') {
            let email = document.querySelector('#email');
            let ip = document.querySelector('#ip');
            let data = e.target.parentElement.title.split(',');
            datas = data;
            studentsName = data[0];
            email.textContent = data[4];
            ip.textContent = data[8].substring(1);
            _alert.style.display = 'block';
            modal.style.zIndex = 1;
            modal.style.display = 'flex';
        }
    }
});

btnDelete.addEventListener('click', (e) => {
    let studentName = document.querySelector('#studentName');
    studentName.textContent = studentsName;
    _alert.style.display = 'none';
    alertWarning.style.display = 'flex';
});

btnClose.addEventListener('click', () => {
    _alert.style.display = 'none';
    modal.style.zIndex = -1;
    modal.style.display = 'none';
});

btnCloseWarning.addEventListener('click', () => {
    _alert.style.display = 'none';
    alertWarning.style.display = 'none';
    modal.style.zIndex = -1;
    modal.style.display = 'none';
});

btnConfirm.addEventListener('click', () => {
    _alert.style.display = 'none';
    alertWarning.style.display = 'none';
    modal.style.zIndex = -1;
    modal.style.display = 'none';
});

btnCancel.addEventListener('click', () => {
    alertWarning.style.display = 'none';
    _alert.style.display = 'block';
});

btnEdit.addEventListener('click', () => {
    formGroup.style.display = 'flex';
    _alert.style.display = 'none';
    let firstName = formGroup.querySelector('#firstName');
    let lastName = formGroup.querySelector('#lastName');
    let ci = formGroup.querySelector('#ci');
    let phone = formGroup.querySelector('#phone');
    let email = formGroup.querySelector('#email');
    let student = formGroup.querySelector('#student');
    let season = formGroup.querySelector('.season');
    let pay = formGroup.querySelector('.pay');
    let radioOp1 = formGroup.querySelector('#optionsRadios1');
    let radioOp2 = formGroup.querySelector('#optionsRadios2');

    firstName.value = datas[0];
    lastName.value = datas[1];
    ci.value = datas[2];
    phone.value = datas[3];
    email.value = datas[4];
    student.value = datas[5];
    season.value = datas[6];
    if(datas[7] == "true") {
        pay.checked = true;
    }else{
        pay.checked = false;
    }
    if(student.value == "Bachiller"){
        radioOp1.checked = true;
    }else{
        radioOp2.checked = true;
    }

})

btnCloseForm1.addEventListener('click', () => {
    formGroup.style.display = 'none';
    _alert.style.display = 'block';
})

btnCloseForm2.addEventListener('click', () => {
    formGroup.style.display = 'none';
    _alert.style.display = 'block';
})

btnSend.addEventListener('click', () => {
    let firstName = formGroup.querySelector('#firstName');
    let lastName = formGroup.querySelector('#lastName');
    let ci = formGroup.querySelector('#ci');
    let phone = formGroup.querySelector('#phone');
    let email = formGroup.querySelector('#email');
    let student = formGroup.querySelector('#student');
    let season = formGroup.querySelector('.season');
    let pay = formGroup.querySelector('.pay');
    
    datas[0] = firstName.value;
    datas[1] = lastName.value;
    datas[2] = ci.value;
    datas[3] = phone.value;
    datas[4] = email.value;
    datas[5] = student.value;
    datas[6] = season.value;
    datas[7] = pay.value;

    alert(datas);
    document.form.submit();
})
