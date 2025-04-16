import Validator from '../Validator';

class TestValidator extends Validator {
    validate(): void {
        if (Math.random() > 0.5) {
            this.errors.push('Random error');
        }
    }
}

describe('Validator', () => {
    let validator: TestValidator;

    beforeEach(() => {
        validator = new TestValidator();
    });

    test('should return true if there are no errors after validation', () => {
        jest.spyOn(validator, 'validate').mockImplementation(() => {
            // No errors added
        });

        expect(validator.isValid()).toBe(true);
    });

    test('should return false if there are errors after validation', () => {
        jest.spyOn(validator, 'validate').mockImplementation(() => {
            validator['errors'].push('Test error');
        });

        expect(validator.isValid()).toBe(false);
    });

    test('should return a copy of errors', () => {
        jest.spyOn(validator, 'validate').mockImplementation(() => {
            validator['errors'].push('Test error 1', 'Test error 2');
        });

        validator.isValid(); // Trigger validation
        const errors = validator.getErrors();

        expect(errors).toEqual(['Test error 1', 'Test error 2']);
        expect(errors).not.toBe(validator['errors']); // Ensure it's a copy
    });

    test('should not validate again if already validated', () => {
        const validateSpy = jest.spyOn(validator, 'validate');

        validator.isValid(); // First call
        validator.isValid(); // Second call

        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
});