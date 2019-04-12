export function postLog(data) {
    fetch("http://localhost:5000/echo", {
        method: "POST",
        body: JSON.stringify(data)
    });
}
