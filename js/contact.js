let input_boxes = document.getElementsByTagName("input");
let text_areas = document.getElementById("comments");

const STRINGS = {
    fullname: "Full Name:",
    email: "Email Address:",
    comments: "Message:",
};

const STRINGS_ERROR = {
    fullname: "Full Name: - Please enter your full name",
    email: "Email Address: - Please enter a valid email address",
    comments: "Message: Please enter something between 1 - 1000 characters",
};

function handle_validation_single(event) {
    let element = event.srcElement;
    let type = element.id;
    let value = element.value;
    let error = false;
    let labelElement = document.querySelector(`label[for="${type}"]`);
    if (type == "fullname") {
        let regex = /^[a-zA-Z\s-']*$/;
        if (value.length < 1 || value.length > 100) {
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
    } else if (type == "comments") {
        if (value.length < 1 || value.length > 1000) {
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
            if (value.length < 1 || value.length > 100) {
                error = true;
                error_list.push("Name");
            } else if (regex.test(value) == false) {
                error = true;
                error_list.push("Name");
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
        }
        if (error) {
            labelElement.innerText = STRINGS_ERROR[type];
        } else {
            labelElement.innerText = STRINGS[type];
        }
    }
    let labelElement = document.querySelector(`label[for="comments"]`);
    if (text_areas.value.length < 1 || text_areas.value.length > 1000) {
        error = true;
        error_list.push("Message");
    }
    if (error) {
        labelElement.innerText = STRINGS_ERROR["comments"];
    } else {
        labelElement.innerText = STRINGS["comments"];
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
            } else if (type == "email") {
                document.getElementById("cfm-" + type).innerText =
                    "Email Address: " + value;
            }
        }
        document.getElementById("cfm-message").innerText =
            "Message: " + document.getElementById("comments").value;
        new bootstrap.Modal(document.getElementById("confirm")).show();
    }
}

async function submit_application() {
    const BACKEND_URL = localStorage.getItem('BACKEND_URL');

    let submit_data = {
        name: document.getElementById("fullname").value,
        email: document.getElementById("email").value.toLowerCase(),
        message: document.getElementById("comments").value,
    };

    if (BACKEND_URL) {
        try {
            const response = await fetch(`${BACKEND_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submit_data),
            });
            if (response.ok) {
                new bootstrap.Modal(document.getElementById("submit_success")).show();
            } else {
                console.error('Failed to submit message to backend');
                // You might want to show a failure modal here
            }
        } catch (error) {
            console.error('Error submitting message to backend:', error);
            // You might want to show a failure modal here
        }
    } else {
        // Fallback to local storage
        let data = JSON.parse(localStorage.getItem('messages'));
        if (!data || !Array.isArray(data)) {
            data = [submit_data];
        } else {
            data.push(submit_data);
        }
        localStorage.setItem('messages', JSON.stringify(data));
        new bootstrap.Modal(document.getElementById("submit_success")).show();
    }
}

for (let i = 0; i < input_boxes.length; i++) {
    input_boxes[i].onblur = handle_validation_single;
};
text_areas.onblur = handle_validation_single;
