---
title: "Swift 內建函數"
---

# Swift 內建函數

## [Functions](https://developer.apple.com/library/ios/documentation/Swift/Reference/Swift_StandardLibrary_Functions/index.html#//apple_ref/doc/uid/TP40016052)

```swift
abs(_:)
alignof(_:)
alignofValue(_:)
anyGenerator<G : GeneratorType>(_: G) -> AnyGenerator<G.Element>
anyGenerator<Element>(_: () -> Element?) -> AnyGenerator<Element>
assert(_:_:file:line:)
assertionFailure(_:file:line:)
debugPrint(_:separator:terminator:)
debugPrint(_:separator:terminator:toStream:)
dump(_:_:name:indent:maxDepth:maxItems:)
dump(_:name:indent:maxDepth:maxItems:)
fatalError(_:file:line:)
getVaList(_:)
isUniquelyReferenced(_:)
isUniquelyReferencedNonObjC<T : AnyObject>(_: T) -> Bool
isUniquelyReferencedNonObjC<T : AnyObject>(_: T?) -> Bool
max(_:_:)
max(_:_:_:_:)
min(_:_:)
min(_:_:_:_:)
numericCast<T : UnsignedIntegerType, U : UnsignedIntegerType>(_: T) -> U
numericCast<T : _SignedIntegerType, U : UnsignedIntegerType>(_: T) -> U
numericCast<T : UnsignedIntegerType, U : _SignedIntegerType>(_: T) -> U
numericCast<T : _SignedIntegerType, U : _SignedIntegerType>(_: T) -> U
precondition(_:_:file:line:)
preconditionFailure(_:file:line:)
print(_:separator:terminator:)
print(_:separator:terminator:toStream:)
readLine(stripNewline:)
sizeof(_:)
sizeofValue(_:)
strideof(_:)
strideofValue(_:)
swap(_:_:)
transcode(_:_:_:_:stopOnError:)
unsafeAddressOf(_:)
unsafeBitCast(_:_:)
unsafeDowncast(_:)
unsafeUnwrap(_:)
withExtendedLifetime<T, Result>(_: T, _: T throws -> Result) rethrows -> Result
withExtendedLifetime<T, Result>(_: T, _: () throws -> Result) rethrows -> Result
withUnsafeMutablePointer(_:_:)
withUnsafeMutablePointers(_:_:_:)
withUnsafeMutablePointers(_:_:_:_:)
withUnsafePointer(_:_:)
withUnsafePointers(_:_:_:)
withUnsafePointers(_:_:_:_:)
withVaList<R>(_: VaListBuilder, _: CVaListPointer -> R) -> R
withVaList<R>(_: [CVarArgType], _: CVaListPointer -> R) -> R
zip(_:_:)
```

