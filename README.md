socalloc
========

Society fund allocator, intended to fairly distribute a pot of funds around a set of societies that request a certain amount.

Works by allocating an amount proportional to a society's member count to each society, up to their requested level. If money remains in the pot, the process is repeated until all societies are given their requested amount or the money runs out.


Running your own copy
---------------------

To get a local copy running, you'll need to run `bower install` to install the dependencies, then run a local server using something like `python -m SimpleHTTPServer`.


License
-------

MIT
