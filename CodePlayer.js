// Define a counter variable to keep track of the number of active tabs
let counter = 0;

// Functions to read the contents of the HTML, CSS, and JS input boxes
function readHTML() {
    let input = "";
    input = $("#htmlInput").val();
    return input;
}

function readJS() {
    let input = "";
    input = $("#js").val();
    return input;
}

function readCSS() {
    let input = "";
    input = $("#css").val();
    return input;
}

// Select all nav elements and inputBoxes
const element = document.querySelectorAll(".nav");
const inputBoxes = document.querySelectorAll(".inputBox");

// When a nav element is clicked...
$(".nav").click(function() {
        // Toggle its active class and update the counter accordingly
        if(!($(this).hasClass("active"))){
            $(this).addClass("active");
            counter++;
        } else {
            $(this).removeClass("active");
            counter--;
        }
        // If no tabs are active, set the main grid to 4 columns
        if(counter == 0) {
            $("main").css("grid-template-columns", "repeat(4, 1fr)");    
        } else {
            // Otherwise, set the main grid to the number of active tabs
            $("main").css("grid-template-columns", "repeat("+ counter +", 1fr)");
        }
        // Loop through all nav elements and inputBoxes
        for(let i = 0; i < element.length; i++){
            // If at least one tab is active...
            if(counter != 0){
                // Hide the inputBox for any inactive tabs
                if(!($(element[i]).hasClass("active"))){
                    $(inputBoxes[i]).css("display","none");
                } else {
                    // Show the inputBox for any active tabs
                    $(inputBoxes[i]).css("display","block");
                }
            } else {
                // If no tabs are active, show all inputBoxes
                $(inputBoxes[i]).css("display","block");
            }
        }
        console.log(counter);
});

// When the "Run" button is clicked...
$("#run").click(function() {
    // Read the contents of the HTML, CSS, and JS input boxes
    let html = readHTML();
    let css = readCSS();
    let js = readJS();

    // Combine the HTML, CSS, and JS into a single string
    let code = "<html><head><style>" + css + "</style></head><body>" + html + "<script>" + js + "</script></body></html>";
    
    // Create iframe and position it in Result Box
    let iframe = document.createElement("iframe");
    iframe.setAttribute("srcdoc", code);
    iframe.setAttribute("style", "width: 100%; height: 100%; border: none;");
    
    $("#result").html(iframe);
});