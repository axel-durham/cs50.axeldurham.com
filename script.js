// From https://gist.github.com/jfreels/6814721
// All comments are my own

/* 'var' and 'let' declare variables
     'var' used to be the only option, 'let' was added in modern JavaScript
     'let' won't let you declare a variable after using it (good thing)
     the only reason to use 'var' over 'let' is to support old internet explorer
     JavaScript uses context to determine variable type
*/

// Anonymous Functions are functions with no name (only used once)

// d3 manipulates the Document Object Model (DOM) which is an object-oriented representation of the web page
// Great d3 guide: https://alignedleft.com/tutorials/d3/binding-data

var tabulate = function(data, columns) {  // function with 'data' and 'columns' as inputs 
    var table = d3.select('body').append('table')  // make 'table' a function that selects the CSS element body and then table
        .attr('class','table')
    
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
    var columns = ['Name', 'Season', 'Location']
    tabulate(data, columns)
})