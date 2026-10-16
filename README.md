# Analytical Dashboard Platform

This repository contains the React frontend and FastAPI backend for the Analytical Dashboard Platform.

## Current account direction

- The application has one role: `User`.
- Users sign in with an assigned user ID and password.
- The login page is the first implementation slice.
- Unique first-time credentials and a forced password change are planned. Credential creation, login verification, and session management are not implemented yet.

## Project layout

- `frontend/` — React application.
- `backend/` — FastAPI application with API, models, schemas, and service modules.

The current login form is a frontend-only placeholder. The API login endpoint is also a TODO and must be implemented before the form can authenticate users.
