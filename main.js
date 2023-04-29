const studentsList = [
  // Добавьте сюда объекты студентов
  {
    name: 'Надежда',
    surname: 'Чепурова',
    lastname: 'Георгиевна',
    startLearning: 2019,
    dateBirthday: new Date(1999, 11, 29),
    faculty: 'Медико-профилактический'
  },
  {
    name: 'Дмитрий',
    surname: 'Фролов',
    lastname: 'Юрьевич',
    startLearning: 2020,
    dateBirthday: new Date(2000, 7, 16),
    faculty: 'Строительный'
  },
  {
    name: 'Антон',
    surname: 'Строев',
    lastname: 'Романович',
    startLearning: 2019,
    dateBirthday: new Date(1999, 11, 25),
    faculty: 'Инженерно-технологический'
  },
  {
    name: 'Оксана',
    surname: 'Телякова',
    lastname: 'Георгиевна',
    startLearning: 2021,
    dateBirthday: new Date(2001, 4, 13),
    faculty: 'Фармацевтический'
  },
  {
    name: 'Денис',
    surname: 'Кущук',
    lastname: 'Олегович',
    startLearning: 2021,
    dateBirthday: new Date(2001, 7, 15),
    faculty: 'Математический'
  },
]

// получение элементов
const formTable = document.getElementById('student-form'),
  surnameInp = document.getElementById('surname'),
  nameInp = document.getElementById('nameInp'),
  lastnameInp = document.getElementById('lastname'),
  facultyInp = document.getElementById('faculty'),
  ageInp = document.getElementById('age'),
  learnInp = document.getElementById('yearOfStudy'),
  studentsTable = document.getElementById('students-table'),
  studentsTableThAll = document.querySelectorAll('.studentsTable th'),
  sortFioBtn = document.getElementById('sort__fio'),
  sortAgeBtn = document.getElementById('sort__age'),
  filterForm = document.getElementById('filter__form'),
  sortFioInp = document.getElementById('filter__form-input-fio'),
  sortFacultyInp = document.getElementById('filter__form-input-faculty'),
  sortAgeInp = document.getElementById('filter__form-input-age')


// Создание параметров сортировки
let column = 'fio',
  columnDir = true


// функция рендеринга
function render() {


  // очищение таблицы после добавления студента
  studentsTable.innerHTML = ''

  //получение информации об одном студенте
  let copyStudentList = [...studentsList];


  // цикл перебора массива студентов для вывода информации об одном студенте
  for (const oneStudent of copyStudentList) {
    oneStudent.fio = oneStudent.surname + ' ' + oneStudent.name + ' ' + oneStudent.lastname;
    oneStudent.age = oneStudent.dateBirthday.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    oneStudent.old = 2023 - oneStudent.dateBirthday.getFullYear();
    oneStudent.learn = oneStudent.startLearning + '-' + 2023 + ' ' + '(' + (2023 - oneStudent.startLearning) + ' ' + 'курс' + ')'
    if (2023 - oneStudent.startLearning > 4) {
      oneStudent.learn = oneStudent.startLearning + '-' + 2023 + ' ' + '(' + 'закончил' + ')'
    }
  }

  // сортировка студентов в зависимости от параметров
  copyStudentList = copyStudentList.sort(function (a, b) {
    let sort = a[column] < b[column]
    if (columnDir === false) {
      sort = a[column] > b[column]
    }

    if (sort) {
      return -1
    }
  })

  // Функция фильтрации
  function filter(arr, prop, value) {
    return arr.filter(function (oneStudent) {
      if (oneStudent[prop].includes(value.trim())) return true
    })
  }

  // параметры фильтрации для инпутов
  if (sortFioInp.value.trim() !== '')
    copyStudentList = filter(copyStudentList, 'fio', sortFioInp.value.trim())

  if (sortFacultyInp.value.trim() !== '')
    copyStudentList = filter(copyStudentList, 'faculty', sortFacultyInp.value.trim())


  // функция, которая создает профиль одного студента
  function createOneStudentTr(oneStudent) {
    const studentTR = document.createElement('tr'),
      fioTd = document.createElement('td'),
      startLearningTd = document.createElement('td'),
      dateBirthdayTd = document.createElement('td'),
      facultyTd = document.createElement('td')


    fioTd.textContent = oneStudent.fio;
    startLearningTd.textContent = oneStudent.learn;
    dateBirthdayTd.textContent = oneStudent.age + '(' + oneStudent.old + ')'
    facultyTd.textContent = oneStudent.faculty


    studentTR.append(fioTd)
    studentTR.append(facultyTd)
    studentTR.append(dateBirthdayTd)
    studentTR.append(startLearningTd)

    return studentTR
  }


  // отрисовка массива студентов в таблице
  for (const oneStudent of copyStudentList) {
    const newTr = createOneStudentTr(oneStudent)


    studentsTable.append(newTr);

  }

}

render()


// Обработчик события на форму для добавления нового студента
formTable.addEventListener('submit', function (event) {
  event.preventDefault()

  // валидация полей формы
  if (nameInp.value.trim() == '') {
    alert('Вы не ввели имя')

    return
  }

  else if (surnameInp.value.trim() == '') {

    alert('Вы не ввели фамилию')

    return
  }

  else if (lastnameInp.value.trim() == '') {
    alert('Вы не ввели отчество')

    return
  }

  else if (learnInp.value == '' || learnInp.value == NaN || 2023 - learnInp.value > 15) {

    alert('Вы не ввели год начала обучения')

    return
  }

  else if (facultyInp.value.trim() == '') {

    alert('Вы не ввели факультет')

    return
  }
  else if (ageInp.value == '') {
    alert('Вы не ввели дату рождения')

    return
  }

  // добавление нового студента
  studentsList.push(
    {
      name: nameInp.value,
      surname: surnameInp.value,
      lastname: lastnameInp.value,
      startLearning: parseInt(learnInp.value),
      dateBirthday: new Date(ageInp.value),
      faculty: facultyInp.value
    }
  )

  render()
})


// обработчик события для кнопок сортировки
// сортировка по ФИО
sortFioBtn.addEventListener('click', function () {
  column = 'fio'
  columnDir = !columnDir

  render()
})


// сортировка по возрасту
sortAgeBtn.addEventListener('click', function () {
  column = 'age'
  columnDir = !columnDir

  render()
})


// // обработчик события на колонки для сортировки
studentsTableThAll.forEach(element => {
  element.addEventListener('click', function () {
    column = this.dataset.column;
    columnDir = !columnDir


    render()
  })
})

// обработчик события, который позволяет начинать фильтрацию в момент ввода текста в поля
filterForm.addEventListener('input', function () {
  render()
})
