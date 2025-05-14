export const animatedRedirect = (e: any, path: string, classSetter: CallableFunction, timeout: number = 250) => {
    e.preventDefault();
    classSetter(true);
    setTimeout(() => location.href = path, timeout);
}
export const relativeCords = (mouseEvent: any, target: any = null) => {
    if (!target) target = mouseEvent.target;
    let rect = target.getBoundingClientRect();
    let x = mouseEvent.clientX - rect.left;
    let y = mouseEvent.clientY - rect.top;
    let cords = { x: Math.floor(x), y: Math.floor(y) };
    return cords;
}
function downloadFile(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function uploadFile(types: string | null = null):Promise<{data:string, filename:string}> {
    return new Promise((resolve) => {
        let fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = types as string;
        fileInput.click();

        fileInput.addEventListener("change", function (event: any) {
            const file = (this.files as FileList)[0] as File;
            console.log(file);
            const reader = new FileReader();
            reader.readAsText(file, "utf-8");
            reader.addEventListener("load", function (event:ProgressEvent<FileReader>) {
                resolve({
                    data:this.result as string,
                    filename:file.name
                });
            });
            reader.addEventListener("error", function () {
                alert("Что-то пошло не так...");
            });

        });
    });
}


export { downloadFile, uploadFile };