let input_boxes = document.getElementsByTagName("input");

const STRINGS = {
    fullname: "Full Name",
    admin_no: "NYP Admission Number",
    email: "Email Address",
    phone: "Phone Number",
};

const STRINGS_ERROR = {
    fullname: "Full Name - Please enter your full name",
    admin_no:
        "NYP Admission Number - Please enter an valid NYP Admission Number",
    email: "Email Address - Please enter a valid email address",
    phone: "Phone Number - Please enter a valid Singapore phone number",
};

function handle_validation_single(event) {
    let element = event.srcElement;
    let type = element.id;
    let value = element.value;
    let error = false;
    let labelElement = document.querySelector(`label[for="${type}"]`);
    if (type == "fullname") {
        let regex = /^[a-zA-Z\s-']*$/;
        if (value.length < 2 || value > 100) {
            error = true;
        } else if (regex.test(value) == false) {
            error = true;
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
        if (regex.test(value) == false) {
            error = true;
        }
    } else {
        return true;
    }
    if (error) {
        labelElement.innerText = STRINGS_ERROR[type];
    } else {
        labelElement.innerText = STRINGS[type];
    }
    return error;
}

function handle_validation_all() {
    let error = false;
    let error_list = [];
    for (let i = 0; i < input_boxes.length; i++) {
        let element = input_boxes[i];
        let type = element.id;
        let value = element.value;
        let labelElement = document.querySelector(`label[for="${type}"]`);
        if (type == "fullname") {
            let regex = /^[a-zA-Z\s-']*$/;
            if (value.length < 1 || value > 100) {
                error = true;
                error_list.push("Full Name");
            } else if (regex.test(value) == false) {
                error = true;
                error_list.push("Full Name");
            }
        } else if (type == "admin_no") {
            let regex = /^\d{6}[a-zA-Z]$/;
            if (value.length !== 7) {
                error = true;
                error_list.push("NYP Admission Number");
            } else if (regex.test(value) == false) {
                error = true;
                error_list.push("NYP Admission Number");
            }
        } else if (type == "email") {
            let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (value.length > 254) {
                error = true;
                error_list.push("Email Address");
            } else if (regex.test(value) == false) {
                error = true;
                error_list.push("Email Address");
            }
        } else if (type == "phone") {
            const regex = /^[689]\d{7}$/;
            if (regex.test(value) == false) {
                error = true;
                error_list.push("Phone Number (Local Only)");
            }
        }
        if (error) {
            labelElement.innerText = STRINGS_ERROR[type];
        } else {
            labelElement.innerText = STRINGS[type];
        }
    }
    if (error) {
        let error_list_element = document.getElementById("errorlist");
        error_list_element.innerHTML = "";
        for (let i = 0; i < error_list.length; i++) {
            let element = document.createElement("li");
            element.innerText = error_list[i];
            error_list_element.append(element);
        }
        new bootstrap.Modal(document.getElementById("error")).show();
    } else {
        for (let i = 0; i < input_boxes.length; i++) {
            let element = input_boxes[i];
            let type = element.id;
            let value = element.value;
            if (type == "fullname") {
                document.getElementById("cfm-" + type).innerText =
                    "Full Name: " + value;
            } else if (type == "admin_no") {
                document.getElementById("cfm-" + type).innerText =
                    "NYP Admission Number: " + value;
            } else if (type == "email") {
                document.getElementById("cfm-" + type).innerText =
                    "Email Address: " + value;
            } else if (type == "phone") {
                document.getElementById("cfm-" + type).innerText =
                    "Phone Number: " + value;
            }
        }
        document.getElementById("cfm-game").innerText =
            "Preferred Game: " + document.getElementById("game").value;
        new bootstrap.Modal(document.getElementById("confirm")).show();
    }
}

function UpdateLocalStorageArray(key, newObject) {
    let data = JSON.parse(localStorage.getItem(key));
    if (newObject.admin_no === undefined) {
        console.error('The new object must have an "admin_no" property.');
        return false;
    }
    if (!data || !Array.isArray(data)) {
        data = [newObject];
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } else {
        const idExists = data.some(
            (item) => item.admin_no === newObject.admin_no
        );
        if (idExists) {
            console.warn(
                `An object with admin no ${newObject.admin_no} already exists.`
            );
            return false;
        } else {
            data.push(newObject);
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        }
    }
}

function submit_application() {
    let submit_application = {
        name: document.getElementById("fullname").value,
        admin_no: document.getElementById("admin_no").value.toUpperCase(),
        email: document.getElementById("email").value.toLowerCase(),
        phone: document.getElementById("phone").value,
        game: document.getElementById("game").value,
    };
    if (UpdateLocalStorageArray("applications", submit_application)) {
        new bootstrap.Modal(document.getElementById("submit_success")).show();
    } else {
        new bootstrap.Modal(document.getElementById("submit_error")).show();
    }
}

for (let i = 0; i < input_boxes.length; i++) {
    input_boxes[i].onblur = handle_validation_single;
}
