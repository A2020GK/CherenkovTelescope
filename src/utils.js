export function pointInCircle(point, center, radius) {
    // Calculate the square of the distance from the point to the center of the circle
    const distanceSquared = (point.x - center.x) ** 2 + (point.y - center.y) ** 2;
    // Calculate the square of the radius
    const radiusSquared = radius ** 2;
    
    // Check if the point is inside or on the circle
    return distanceSquared < radiusSquared;
}
export function relativeCords(mouseEvent) {
    let rect = mouseEvent.target.getBoundingClientRect();
    let x = mouseEvent.clientX - rect.left;
    let y = mouseEvent.clientY - rect.top;
    let cords = { x: Math.floor(x), y: Math.floor(y) };
    return cords;
}
