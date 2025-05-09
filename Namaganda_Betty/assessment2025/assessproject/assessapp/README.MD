
### Step 1: Set Up Your Django Project
First, ensure you have Django installed. If not, you can install it using pip:


bash
pip install django


Create a new Django project and an app for inventory management:


bash
django-admin startproject inventory_project
cd inventory_project
python manage.py startapp inventory


### Step 2: Define Your Models
In inventory/models.py, define a model for Product:




### Step 3: Create and Apply Migrations
Run the following commands to create and apply migrations for your Product model:


bash
python manage.py makemigrations
python manage.py migrate


### Step 4: Create Forms
In inventory/forms.py, create a form for adding new products:




### Step 5: Create Views
In inventory/views.py, define views for displaying products and adding new products:




### Step 6: Create Templates
Create a directory named templates inside your inventory app, and within it, create another directory named inventory. Inside inventory, create product_list.html and add_product.html.
### Step 7: URL Configuration
