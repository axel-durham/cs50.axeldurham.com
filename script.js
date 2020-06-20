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
        .attr('class','table table-striped')
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
})

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