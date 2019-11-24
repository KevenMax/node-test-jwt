const bcrypt = require("bcryptjs");

const trucante = require("../utils/truncate");
const factory = require("../factories");

describe("User", () => {
  beforeEach(async () => {
    await trucante;
  });

  it("should encrypt user password", async () => {
    const user = await factory.create("User", { password: "123456" });

    const compareHash = await bcrypt.compare("123456", user.password_hash);

    expect(compareHash).toBe(true);
  });
});
