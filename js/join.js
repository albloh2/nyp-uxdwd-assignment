let input_boxes = document.getElementsByTagName("input")

const STRINGS = {
    "fullname": "Full Name",
    "admin_no": "NYP Admission Number",
    "email": "Email Address",
    "phone": "Phone Number"
};

function handle_validation_single(event) {
    let element = event.srcElement;
    let type = element.id;
    let value = element.value;
    let error = false;
    let labelElement = document.querySelector(`label[for="${inputId}"]`);
    if (type == "fullname") {
        let regex = /^[a-zA-Z\s-']*$/;
        if (value.length < 2 || value > 100) {
            error = true;
        } else if (regex.test(value) == false) {
            error = true
        }
    } else if (type == "admin_no") {
        let regex = /^\d{6}[a-zA-Z]$/;
        if (value.length < 2 || value > 100) {
            error = true;
        } else if (regex.test(value) == false) {
            error = true;
        }
    } else if (type == "email") {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value.length > 254) {
            error = true;
        } else if (regex.test(value) == false) {
            error = true;
        }
    } else if (type == "phone") {
        const regex = /^[689]\d{7}$/;
        if (regex.test(value)) {
            error = true;
        }
    } else {
        return
    }
    if (error) {
        labelElement.innertext;
    }
}

document.getElementsByTagName("input")[0].onblur = handle_validation_single;
