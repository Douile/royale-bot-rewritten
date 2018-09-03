exports.testPrefixes = (content,prefixes) => {
  for (var i=0;i<prefixes.length;i++) {
    var reg = new Regexp(`^${prefixes[i]}`);
    if (reg.test(content)) {
      return prefixes[i];
    }
  }
  return false;
}
