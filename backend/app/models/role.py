from enum import Enum


class UserRole(str, Enum):
    """Application role set; all accounts currently use the User role."""

    USER = "user"
