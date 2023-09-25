var InterceptPermissionFragment = XposedHelpers.findClass(
  "com.miui.permcenter.privacymanager.InterceptPermissionFragment",
  runtime.classLoader
);
var methods = InterceptPermissionFragment.getDeclaredMethods();
for (var i = 0; i < methods.length; i++) {
  if (
    methods[i].getParameterTypes().length === 0 &&
    String(methods[i].getReturnType()) === "int" &&
    methods[i].toString().startsWith("protected")
  ) {
    // console.log(methods[i].getName());
    XposedHelpers.findAndHookMethod(
      "com.miui.permcenter.privacymanager.InterceptPermissionFragment",
      runtime.classLoader,
      methods[i].getName(),
      //   [],
      XC_MethodHook({
        beforeHookedMethod: function (param) {
        //   console.log("hook before");
        },
        afterHookedMethod: function (param) {
        //   console.log("hook after");
          if (String(param.getResult()) === "10") {
            param.setResult(java.lang.Integer.valueOf("0"));
          }
        },
      })
    );
  }
}
