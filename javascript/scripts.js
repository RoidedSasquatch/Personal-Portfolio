/*--Code by Dan Blais
040826486
scripts.js
CST8285 Web Programming
Due: February 25th, 2024
Assignment 01*/

/*This Javascript file contains scripts to provide functionality to the search, filter, and sort fields.
  Scripts consist of loops to search through table elements and parse and match string values in the table
  to values defined by the input fields. Three functions are included, one for each input field. The
  two credited scripts are from W3Schools while the second, uncredited script was written by hand by the
  author of the website. The credited scripts were modified to take the filter into account. If filtering by a level
  the search script will only search through rows that match the filtered level*/

/* [1]W3Schools, How To - Filter/Search Table, W3Schools.com, https://www.w3schools.com/howto/howto_js_filter_table.asp
      (retrieved February 19, 2019)*/
function searchCourses() {
    var input, inputSel, filter, filterSel, table, row, data, level, i, text;
    input = document.getElementById("search");
    inputSel = document.getElementById("filter");
    filter = input.value.toUpperCase();
    filterSel = inputSel.value;
    table = document.getElementById("course-table");
    row = table.getElementsByClassName("table-data");

    for(i = 0 ; i < row.length ; i++) {
        data = row[i].getElementsByClassName("data-item")[1]; //Get column 1 data
        level = row[i].getElementsByClassName("data-item")[2]; //Get column 2 data
        if (data) {
          text = data.textContent || data.innerText; //set text var = to data var
          if(text.toUpperCase().indexOf(filter) > -1 && level.textContent == filterSel && filterSel != 0)
            row[i].style.display = ""; //Hide row if string doesn't match string in filter array. Search is dependent on the selected level filter.
          else if(text.toUpperCase().indexOf(filter) > -1 && filterSel == 0)
            row[i].style.display = ""; //Enable search independent of the selected filter (for the case where no filter is applied)
          else
            row[i].style.display = "none"; //Show row if above conditions not met. 
        }
    }  
}

function filterLevel() {
    var input, filter, table, row, data, i;
    input = document.getElementById("filter");
    filter = input.value;
    table = document.getElementById("course-table");
    row = table.getElementsByClassName("table-data");

    for(i = 0 ; i < row.length ; i++) {
        data = row[i].getElementsByClassName("data-item")[2];
        if(data) {
          if(filter == 0) //Determine what the value of the filter select box is and display rows based on matching vals.
            row[i].style.display = "";
          else if(filter == 1 && data.textContent == filter) 
              row[i].style.display = "";
          else if(filter == 2 && data.textContent == filter)
              row[i].style.display = "";
          else
            row[i].style.display = "none";
        }
    }
}

/*[2]W3Schools, How To - Sort a Table, W3Schools.com, https://www.w3schools.com/howto/howto_js_sort_table.asp,
     (Retrieved February 19, 2024)*/
function sortLevel(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("course-table");
    switching = true;
    dir = "asc";

    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length-1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByClassName("data-item")[n];
        y = rows[i + 1].getElementsByClassName("data-item")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }