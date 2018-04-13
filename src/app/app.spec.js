import {validYear} from './app';

describe('app', () => {

  describe('Input Validation', () => {

    const notyMock = {};
    notyMock.show = () => {};

    it('should be a valid year', () => {


      expect(validYear(notyMock, "2001")).toBe(true);
    });

    it('should be a valid year', () => {

      expect(validYear(notyMock, "abc")).toBe(false);
    });
  });
});