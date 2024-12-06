# Camera Management System

This project is a Camera Management System designed to manage and monitor cameras, including features like location-based filtering, status management, and UI enhancements for better UX.

## Features

### 1. **Location and Status Filters**
   - **Location Filter:** A dropdown to filter cameras by location. It is dynamically populated based on the list of cameras available.
   - **Status Filter:** A dropdown to filter cameras by their status, with the options `Active` and `Inactive`.

### 2. **Camera Health Display**
   - **Health Rings:** Each camera's health is represented using a ring that visually indicates the health of the device and cloud, ranging from `A` (green) to `F` (red). The circle fills based on the health grade and changes color accordingly.

### 3. **Pagination**
   - The table displaying the camera data supports pagination with:
     - A dropdown for selecting the number of items per page (`2`, `5`, `10`, `20`, `50`).
     - Page navigation buttons (`<<`, `<`, `>`, `>>`) to move between pages, allowing users to easily navigate through large datasets.

### 4. **Select and Delete Functionality**
   - **Checkbox Selection:** Each row in the camera table has a checkbox for selecting individual items. Additionally, there's a "Select All" checkbox in the header.
   - **Delete Button:** A delete button is provided to remove selected rows from the table. This button is designed with better UI/UX, featuring a red background and a trash icon to indicate the delete action.

### 5. **Responsive and Accessible UI**
   - The UI is designed with responsive elements to ensure that it works well on various screen sizes.
   - The delete button is enhanced with hover and focus effects to ensure good user experience and accessibility.

## Installation

To get started with the project, follow these steps:

### Prerequisites
- Ensure you have `Node.js` and `npm` installed on your machine.
  
### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/camera-management-system.git
cd camera-management-system
```
### Step 2: Install dependencies
```bash
Copy code
npm install
```

### Step 3: Start the development server
```bash
Copy code
npm start
```

## Usage
Filter Cameras by Location and Status: Use the dropdown filters to view cameras based on location or status. The camera list will be dynamically updated based on your selection.
View Camera Health: Each camera entry displays its health, represented by a ring that fills and changes color depending on the health grade.
Paginate through Cameras: Use the pagination controls to navigate between pages of camera data.
Select and Delete Cameras: Check individual rows or use the "Select All" checkbox to select multiple cameras. Then, click the delete button to remove the selected cameras from the table.
