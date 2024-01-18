document.addEventListener('DOMContentLoaded', function () {
    var rows = document.querySelectorAll('#peopleTable tbody tr');

    // Обработчик события для кнопки "Открыть попап"
    document.getElementById('openPopupButton').addEventListener('click', openTerritoryPopup);
});

function openTerritoryPopup() {
    var territoryPopupContainer = document.getElementById('territoryPopupContainer');
    var overlay = document.getElementById('overlay');
    territoryPopupContainer.style.display = 'block';
    overlay.style.display = 'block';

    // Создаем объект для хранения количества строк по каждой позиции в колонке "Територія"
    var territoryCounts = {};

    // Подсчет количества выделенных зеленым цветом строк
    var highlightedRowsCount = 0;

    // Перебираем все строки
    rows.forEach(function (row) {
        // Добавляем класс .highlight, если строка выделена зеленым
        if (!row.classList.contains('highlighted')) {
            var territory = row.children[2].textContent; // Здесь 2 - индекс колонки "Територія", начиная с 0
            territoryCounts[territory] = (territoryCounts[territory] || 0) + 1;
        } else {
            highlightedRowsCount++;
        }
    });

    // Вставляем результат в таблицу в попапе
    var territoryCountTable = document.getElementById('territoryCountTable').getElementsByTagName('tbody')[0];
    territoryCountTable.innerHTML = '';

    // Сортировка объекта по убыванию
    var sortedTerritories = Object.keys(territoryCounts).sort(function (a, b) {
        return territoryCounts[b] - territoryCounts[a];
    });

    sortedTerritories.forEach(function (territory) {
        var row = territoryCountTable.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = territory;
        cell2.innerHTML = territoryCounts[territory];
        cell3.innerHTML = highlightedRowsCount;
    });
}

// Закрывает попап
function closeTerritoryPopup() {
    var territoryPopupContainer = document.getElementById('territoryPopupContainer');
    var overlay = document.getElementById('overlay');
    territoryPopupContainer.style.display = 'none';
    overlay.style.display = 'none';
}

// Функция для сортировки таблицы по заданному столбцу
function sortTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("territoryCountTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 0; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];
            if (columnIndex === 1) {
                shouldSwitch = Number(x.innerHTML) < Number(y.innerHTML);
            } else {
                shouldSwitch = x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase();
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
}
