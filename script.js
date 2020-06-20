/* 'var' and 'let' declare variables
     'var' used to be the only option, 'let' was added in modern JavaScript
     'let' won't let you declare a variable after using it (good thing)
     the only reason to use 'var' over 'let' is to support old internet explorer
     JavaScript uses context to determine variable type
*/

// Anonymous Functions are functions with no name (only used once)

// d3 manipulates the Document Object Model (DOM) which is an object-oriented representation of the web page
// Great d3 guide: https://alignedleft.com/tutorials/d3/binding-data

// Adapted from https://gist.github.com/jfreels/6814721
// All comments are my own
var tabulate = function(data, columns) {  // function with 'data' and 'columns' as inputs 
    var table = d3.select('body').select('main').append('table')  // make 'table' a function that selects the CSS element body and then table
        .attr('class','table')
        .attr('id', 'fish')
    
        var thead = table.append('thead')  // make 'thead' a function that runs 'table' then appends a table header
        var tbody = table.append('tbody')  // make 'tbody' a function that runs 'table' then appends a table body

        thead.append('tr')  // make a table header and append a row to thead...
        .selectAll('th')  // then select all cells in thead...
        .data(columns)  // replaces the cells with the value of 'columns'
        .enter()  // if there are more elements in columns than cells in thead, the overflow is returned by enter. (this should be all of contents for me)
        .append('th')  // append th into selection
        .text(function (d) { return d })  // Finally add data from enter into 'th'

        var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')

        var cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function (column) {
                return {column: column, value: row[column] }
            })
        })
        .enter()
        .append('td')
        .text(function (d) {return d.value })

    return table;
}

d3.csv('fish.csv', function (data) {
    var columns = ['Name', 'Month_list', 'Month', 'Location', 'Shadow', 'Selling Price', 'Time_list', 'Time']
    tabulate(data, columns)
    sortTable()
})

// Adapted from https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("fish")
    switching = true;
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        // Loop through all table rows (except the first, which contains table headers):
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            // Get the two elements you want to compare, one from current row and one from the next:
            x = rows[i].getElementsByTagName("TD")[5];
            y = rows[i + 1].getElementsByTagName("TD")[5];
            // Check if the two rows should switch place:
            if (parseInt(x.innerHTML.replace(",", "")) < parseInt(y.innerHTML.replace(",", ""))) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark that a switch has been done:
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


// Adapted from https://stackoverflow.com/questions/51515778/how-to-filter-an-html-table-based-on-drop-down-selected-value/51517077 
// Comments are my own
function filterTable() {
    var table, tr, td_month, td_location, td_time, i;

    var input_month = document.getElementById("month_selector");  // Makes input the season dropdown
    var input_location = document.getElementById("location_selector");  // Makes input the season dropdown
    var input_time = document.getElementById("time_selector");  // Makes input the season dropdown
    var filter_month = input_month.value.toUpperCase();  // Make filter the uppercase value of the season dropdown
    var filter_location = input_location.value.toUpperCase();  // Make filter the uppercase value of the season dropdown
    var filter_time = input_time.value.toUpperCase();  // Make filter the uppercase value of the season dropdown
    table = document.getElementById("fish");  // Make table the table with id 'fish'
    tr = table.getElementsByTagName("tr");  // Make tr all the rows of the table
    
    // Iterate through every row
    for (i=0; i < tr.length; i++) {
        td_month = tr[i].getElementsByTagName("td")[1];  // Make td the current row's second cell (Season)
        td_location = tr[i].getElementsByTagName("td")[3];
        td_time = tr[i].getElementsByTagName("td")[6];

        // Make sure there is some table data in the row
        if (td_month || td_location || td_time) {
            // Search for filter in the cell's text
            if (
                td_month.innerHTML.toUpperCase().indexOf(filter_month) > -1 && 
                td_location.innerHTML.toUpperCase().indexOf(filter_location) > -1 &&                
                td_time.innerHTML.toUpperCase().indexOf(filter_time) > -1
            ){
                tr[i].style.display = "";  // Display the row
            } else {
                tr[i].style.display = "none";  // Don't display the row
            }
        }
    }
}