/*
Task: Extend gallery functionality by adding interactivity using event handling features.
You need to take the result of what you achieved in the previous assignment and expand your application's functionality
with new features.
Full explanation of the assignment is available in the video. Below are the key points for reference.

1. Use Gallery code from previous Homework.
2. Use template literals to build the gallery.
3. Remove the select box that allows the user to choose the number of elements to display and the type of gallery.
    Always render all images using template literals.
4. Add a new item to the gallery when the corresponding button ("Add image") is clicked.
5. Display the number of available elements that can still be added.
6. When all available elements are added, disable the "Add" button (change its color to gray).
7. If the user tries to click the disabled button, show a modal window with a message stating that further additions are
    not possible.
8.* Implement the modal window using the Bootstrap 3 or Bootstrap 4 `Modal` component instead of the default `alert`.
9.* Implement image removal functionality. Use the "event delegation" pattern. That means the event handler should not
    be attached to each "delete" button, but rather to the higher-level element.
10. Extend the gallery by adding a sorting feature (select box). The select box should have four options: "By name A-Z",
    "By name Z-A", "Newest first", "Oldest first".
11. When the sorting option is changed, the gallery should automatically update. No button click is required. The number
    of images displayed should remain the same as before the sorting (e.g., if six images were added, six images should
    remain after sorting). On the first load, the default filter should be "By name A-Z".
12. Save the filter value in `localStorage`. After the page is refreshed, the last selected filter should automatically
    be applied.
*/
