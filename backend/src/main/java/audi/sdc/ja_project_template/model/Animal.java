package audi.sdc.ja_project_template.model;

public record Animal(int id, String name, int numberOfLegs) {
    public Animal{
        validateName(name);
        validateNumberOfLegs(numberOfLegs);
    }

    private void validateNumberOfLegs(int numberOfLegs) {
        if (numberOfLegs < 0) {
            throw new IllegalArgumentException("Number of legs cannot be negative");
        }
    }

    private void validateName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("A meaningful name has to be provided");
        }
    }
}
