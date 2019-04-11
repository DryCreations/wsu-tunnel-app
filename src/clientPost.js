export function postLog(data) {
    fetch("/log", {
        method: "POST",
        body: JSON.stringify(data)
    });
}
