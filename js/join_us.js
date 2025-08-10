let input_boxes = document.getElementsByTagName("input")

function handle_validation(event) {
    let element = event.srcElement;
    let type = element.id;
    let value = element.value;
    let error = false;
    if (type == "fullname") {
        if (value.length < 2 || value > 100) {
            error = true;
        }
    }
}

document.getElementsByTagName("input")[0].onblur = handle_validation;
