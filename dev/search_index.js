var documenterSearchIndex = {"docs":
[{"location":"Internals/binaries/","page":"Binaries","title":"Binaries","text":"CurrentModule = XPORTA","category":"page"},{"location":"Internals/binaries/#Binaries","page":"Binaries","title":"Binaries","text":"","category":"section"},{"location":"Internals/binaries/","page":"Binaries","title":"Binaries","text":"The PORTA source code is compiled into two binaries, xporta and valid. Each binary exposes a several subroutines. For more information regarding these binaries and their subroutines, please refere to the PORTA Documentation.","category":"page"},{"location":"Internals/binaries/#xporta","page":"Binaries","title":"xporta","text":"","category":"section"},{"location":"Internals/binaries/","page":"Binaries","title":"Binaries","text":"run_xporta","category":"page"},{"location":"Internals/binaries/#XPORTA.run_xporta","page":"Binaries","title":"XPORTA.run_xporta","text":"run_xporta( method_flag::String, args::Array{String,1}; verbose::Bool = false) :: String\n\nwarning: Warning\nThis method is intended for advanced use of the xporta binary. User knowledge of flags and arguments is required for successful execution. Furthermore, users must explicitly handle file IO for the xporta binary.\n\nRuns the xporta binary through PORTA_jll and returns a string containing STDOUT. The method_flag argument specifies which xporta subroutine to call.\n\nValid options for method_flag are:\n\n\"-D\" runs the dim subroutine\n\"-F\" runs the fmel subroutine\n\"-S\" runs the portsort subroutine\n\"-T\" runs the traf subroutine\n\nThe args parameter is uniquely specified by method_flag, for more information regarding methods and arguments see the xporta documentation.\n\nIf verbose=true the xporta prints to STDOUT.\n\n\n\n\n\n","category":"function"},{"location":"Internals/binaries/#valid","page":"Binaries","title":"valid","text":"","category":"section"},{"location":"Internals/binaries/","page":"Binaries","title":"Binaries","text":"run_valid\niespo","category":"page"},{"location":"Internals/binaries/#XPORTA.run_valid","page":"Binaries","title":"XPORTA.run_valid","text":"run_valid( method_flag::String, args::Array{String,1}; verbose::Bool=false ) :: String\n\nwarning: Warning\nThis method is intended for advanced use of the valid binary. User knowledge of flags and arguments is required for successful execution. Users must explicitly handle file IO for the valid binary.\n\nRuns the valid binary through PORTA_jll and returns a string containing STDOUT. The method_flag specifies which valid subroutine to call.\n\nValid options for method_flag are:\n\n\"-C\" runs the fctp subroutine\n\"-I\" runs the iespo subroutine\n\"-P\" runs the posie subroutine\n\"-V\" runs the vint subroutine\n\nThe args parameter is uniquely specified by method_flag, for more information regarding methods and arguments see the valid documentation.\n\nIf verbose=true the valid binary prints to STDOUT.\n\n\n\n\n\n","category":"function"},{"location":"Internals/binaries/#XPORTA.iespo","page":"Binaries","title":"XPORTA.iespo","text":"iespo( ieq::IEQ, poi::POI; kwargs...) :: IEQ{Rational{Int}}\n\nEnumerates the valid equations and inequalities of the IEQ which satisfy the points and rays in the POI. An IEQ containing valid inequalities and equations is returned.\n\ndanger: Danger\nThis method does not work as described by the PORTA iespo documentation. Invalid in/equalities are not filtered out. However, the strong validity check does work.To run the strong validity check, use arguments cleanup=false and opt_flag=\"-v\". With these arguments, iespo() will print a table to the output .ieq file which can manually be read/parsed.In a future update, a parser may be written for the strong validity table or the PORTA source code may be update to properly execute the in/equality filtering.\n\nkwargs is shorthand for the following keyword arguments:\n\ndir::String = \"./\" - The directory to which files are written.\nfilename::String = \"iespo_tmp\"- The name of produced files.\nstrong_validity::Bool =  false - Prints the strong validity table to the output IEQ, (requires manual parsing).\ncleanup::Bool = true - If true, created files are removed after computation.\nverbose::Bool = false- If true, PORTA will print progress to STDOUT.\n\nFor more details regarding iespo() please refer to the PORTA iespo documentation.\n\n\n\n\n\n","category":"function"},{"location":"Internals/wrapping_porta/#Wrapping-PORTA","page":"Wrapping PORTA","title":"Wrapping PORTA","text":"","category":"section"},{"location":"Internals/wrapping_porta/#PORTA-XPORTA.jl","page":"Wrapping PORTA","title":"PORTA -> XPORTA.jl","text":"","category":"section"},{"location":"Internals/wrapping_porta/","page":"Wrapping PORTA","title":"Wrapping PORTA","text":"The julia ecosystem provides a convenient set of tools for cross-compiling C libraries. The process followed by XPORTA.jl is outlined below.","category":"page"},{"location":"Internals/wrapping_porta/","page":"Wrapping PORTA","title":"Wrapping PORTA","text":"The PORTA source code is forked from the github.com/denisrosset/porta repository to github.com/bdoolittle/julia-porta. Forking the source allows:\nWeblinks to be made directly from these docs to the PORTA documentation.\nUpdates to be made to the GNU Makefile enabling cross-platform compilation.\nCompilation errors to be fixed.\nThe BinaryBuilder.jl script is used to generate and test the cross-compilation build script for PORTA.\nThe build script runs against a specific commit to the julia-porta repo ensuring that all users run the same PORTA binaries.\nThe PORTA_jll.jl module is auto-generated and published to the JuliaBinaryWrappers github repo.\nPORTA_jll.jl wraps the compiled PORTA binaries and executes the correct binary for the environment in which julia is running.\nBinaries are easily called through julia without requiring users to download or compile the source code.\nPORTA_jll.jl is not a complete wrapper because it lacks, testing, documentation and requires users to handle PORTA specific file IO tasks.\nThe XPORTA.jl package provides an easy-to-use interface for PORTA_jll.jl.","category":"page"},{"location":"Internals/wrapping_porta/#PORTA-History","page":"Wrapping PORTA","title":"PORTA History","text":"","category":"section"},{"location":"Internals/wrapping_porta/","page":"Wrapping PORTA","title":"Wrapping PORTA","text":"The official PORTA software was released in 1997 and the source code can be found at http://porta.zib.de. The source code is not actively maintained and as a result, PORTA has become incompatible with some computing environments.","category":"page"},{"location":"Internals/wrapping_porta/","page":"Wrapping PORTA","title":"Wrapping PORTA","text":"In April 2014, github user denisrosset uploaded the PORTA source code to github.com/denisrosset/porta. Minimal changes were made to the source code fixing compilation errors on Mac OSX.","category":"page"},{"location":"Internals/wrapping_porta/","page":"Wrapping PORTA","title":"Wrapping PORTA","text":"As of May 2020, there are a number of open forks of denisrosset's PORTA repository. The julia-porta repo is one such case. These forks represent a new interest of an old software. Given a current base of PORTA users, it is possible that the community will absorb the task of maintaining the PORTA source code.","category":"page"},{"location":"Internals/file_io/","page":"File IO","title":"File IO","text":"CurrentModule = XPORTA","category":"page"},{"location":"Internals/file_io/#File-IO","page":"File IO","title":"File IO","text":"","category":"section"},{"location":"Internals/file_io/","page":"File IO","title":"File IO","text":"Files are used to pass data to and from the PORTA binaries. The vertex representation is written to files with the .poi extension while the halfspace representation is written to files with the .ieq extension","category":"page"},{"location":"Internals/file_io/","page":"File IO","title":"File IO","text":"For more details regarding the .poi and .ieq file formats, please refer to the PORTA General File Format docs.","category":"page"},{"location":"Internals/file_io/#Reading-and-Writing-PORTA-Files","page":"File IO","title":"Reading & Writing PORTA Files","text":"","category":"section"},{"location":"Internals/file_io/","page":"File IO","title":"File IO","text":"read_poi\nread_ieq\nwrite_poi\nwrite_ieq","category":"page"},{"location":"Internals/file_io/#XPORTA.read_poi","page":"File IO","title":"XPORTA.read_poi","text":"read_poi( filepath::String ) :: POI{Rational{Int}}\n\nConstructs a POI struct by parsing the provided .poi file. A DomainError is thrown if argument filepath does not end with the .poi extension.\n\n\n\n\n\n","category":"function"},{"location":"Internals/file_io/#XPORTA.read_ieq","page":"File IO","title":"XPORTA.read_ieq","text":"read_ieq( filepath::String ) :: IEQ{Rational{Int}}\n\nConstructs an IEQ struct by parsing the provided .ieq file. A DomainError is thrown if argument filepath does not end with the .ieq extension.\n\n\n\n\n\n","category":"function"},{"location":"Internals/file_io/#XPORTA.write_poi","page":"File IO","title":"XPORTA.write_poi","text":"write_poi(filename::String, poi::POI; dir::String=\"./\") :: String\n\nWrites a .poi file, dir/filename.poi, from the provided POI. If filename does not explicitly have the .poi extension, it will automatically be added. The method returns the complete file path for the created file, dir/filename.poi.\n\n\n\n\n\n","category":"function"},{"location":"Internals/file_io/#XPORTA.write_ieq","page":"File IO","title":"XPORTA.write_ieq","text":"write_ieq( filename::String, ieq::IEQ; dir::String=\"./\") :: String\n\nWrites an .ieq file, dir/filename.ieq, from the provided IEQ struct. If filename does not explicitly contain the .ieq extension, it will be added automatically. The method returns the complete file path for the created file, dir/filename.ieq.\n\n\n\n\n\n","category":"function"},{"location":"Internals/file_io/#Temp-Files-(Default-Usage)","page":"File IO","title":"Temp Files (Default Usage)","text":"","category":"section"},{"location":"Internals/file_io/","page":"File IO","title":"File IO","text":"By default, XPORTA.jl will create the porta_tmp/ directory to which it will write all PORTA related files. At the end of computation, porta_tmp/ and all of its contents are deleted.","category":"page"},{"location":"Internals/file_io/","page":"File IO","title":"File IO","text":"This functionality can be overridden by passing cleanup = false to the appropriate methods, e.g. traf.  ","category":"page"},{"location":"Internals/file_io/","page":"File IO","title":"File IO","text":"make_porta_tmp\nrm_porta_tmp","category":"page"},{"location":"Internals/file_io/#XPORTA.make_porta_tmp","page":"File IO","title":"XPORTA.make_porta_tmp","text":"make_porta_tmp( dir::String = \"./\") :: String\n\nCreates the porta_tmp/ directory in directory dir and returns the porta_tmp path.\n\n\n\n\n\n","category":"function"},{"location":"Internals/file_io/#XPORTA.rm_porta_tmp","page":"File IO","title":"XPORTA.rm_porta_tmp","text":"rm_porta_tmp( dir::String = \"./\")\n\nRecursively removes porta_tmp/ from directory dir.\n\nwarning: Warning\nThis method uses rm(\"<dir/>porta_tmp/\", force=true, recursive=true). Make sure not to delete important data.\n\n\n\n\n\n","category":"function"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"CurrentModule = XPORTA","category":"page"},{"location":"user_guide/#User-Guide","page":"User Guide","title":"User Guide","text":"","category":"section"},{"location":"user_guide/#Setup","page":"User Guide","title":"Setup","text":"","category":"section"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"Download and install julia.\nAdd the XPORTA.jl package.","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"julia> using Pkg; Pkg.add(\"XPORTA\")","category":"page"},{"location":"user_guide/#Simple-Example","page":"User Guide","title":"Simple Example","text":"","category":"section"},{"location":"user_guide/#Simplex:-Vertex-Representation-Halfspace-Representation","page":"User Guide","title":"3-Simplex: Vertex Representation -> Halfspace Representation","text":"","category":"section"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"Given a set of vertices, PORTA can find the linear equalities and inequalities bounding the convex hull of vertices.","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"Consider the vertices of the following 3-simplex (equilateral triangle).","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"beginmatrix\nbeginmatrix\nv_1 = (1 0 0) \nv_2 = (0 1 0) \nv_3 = (0 0 1) \nendmatrix  rightarrow  beginbmatrix\n1  0  0  0  1  0  0  0  1\nendbmatrix\nendmatrix","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"The vertices are cartesian coordinates, v_i = (x_i y_i z_i), and the right-hand-side matrix is constructed by stacking each vertex as a row in the matrix.","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"This code block demonstrates how to use XPORTA.jl to compute the halfspace representation of the 3-simplex.","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"using XPORTA\n\n# Construct the vertex representation (POI) of the 3-simplex.\nsimplex_poi = POI(vertices = [1 0 0;0 1 0;0 0 1])\n\n# Compute the halfspace representation (IEQ) with traf().\nsimplex_ieq = traf(simplex_poi)\n\n# Print out the bounding linear equalities and inequalites.\nprintln(\"Simplex Equalities: \", simplex_ieq.equalities)\nprintln(\"Simplex Inequalities: \", simplex_ieq.inequalities)","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"The equality represents a normalization constraint","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"x + y + z = 1","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"The inequalities represent positivity constraints on x, y, and z.","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"beginmatrix\n-y leq 0    y geq 0 \n-z leq 0  rightarrow  z geq 0 \ny + z leq 1    x geq 0\nendmatrix","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"The right-hand-side is realized by applying the the normalization constraint and performing some algebra.","category":"page"},{"location":"user_guide/","page":"User Guide","title":"User Guide","text":"warning: PORTA is a Rational Solver\nMethods accept matrices of type Int or Rational{Int}. All other types will result in a TypeError when constructing a POI or IEQ.","category":"page"},{"location":"exports/","page":"Exports","title":"Exports","text":"CurrentModule = XPORTA","category":"page"},{"location":"exports/#Exports","page":"Exports","title":"Exports","text":"","category":"section"},{"location":"exports/","page":"Exports","title":"Exports","text":"XPORTA","category":"page"},{"location":"exports/#XPORTA.XPORTA","page":"Exports","title":"XPORTA.XPORTA","text":"The main module of XPORTA.jl provides an interface to the PORTA software. Exported types and methods use historical names from the PORTA software.\n\nExports\n\nTypes\n\nPOI - The vertex representation of a polyhedra.\nIEQ - The intersecting halfspace representation of a polyhedra.\n\nMethods\n\ntraf - Converts a POI -> IEQ or IEQ -> POI.\ndim - Given a POI computes the dimension and constraining equalities of the POI convex hull.\nfmel - Projects the linear system of IEQ onto a subspace using fourier-motzkin elimination.\nvint - Enumerates the integral points which satisfy the linear system specified by an IEQ.\nportsort - Sorts the elements of POI and IEQ structs.\nposie - Enumerates the points and rays of a POI which satisfy the linear system of an IEQ.\nfctp - Determines if inequalities are tight or violated by elements of a POI.\n\nThe compiled PORTA binaries are accessed through PORTA_jll.jl\n\nnote: File IO and Temp Files\nThe PORTA binaries use files to read and write data. XPORTA.jl writes the input to a temp file, runs the PORTA binary, and reads the output from a file created by PORTA.By default, all intermediate files are written to a porta_tmp/ directory. At the end of computation, data is returned to the user and porta_tmp/ is deleted. This functionality is intended to prevent the local filesystem from becoming polluted with temp files.Please note that in the case of failure porta_tmp/ may not get deleted.\n\n\n\n\n\n","category":"module"},{"location":"exports/#Types","page":"Exports","title":"Types","text":"","category":"section"},{"location":"exports/","page":"Exports","title":"Exports","text":"PortaMatrix\nPOI\nIEQ","category":"page"},{"location":"exports/#XPORTA.PortaMatrix","page":"Exports","title":"XPORTA.PortaMatrix","text":"PORTA is a rational solver, its methods accept integer or rational valued matrices. PortaMatrix describes the union of these types to simplify notation.\n\nPortaMatrix = Union{Matrix{Int}, Matrix{Rational{Int}}}\n\n\n\n\n\n","category":"type"},{"location":"exports/#XPORTA.POI","page":"Exports","title":"XPORTA.POI","text":"The vertex representation of a polyhedron. This struct is analogous to PORTA files with the .poi extension. Please refer to the PORTA General File Format docs for more information regarding the .poi file format.\n\nConstructor arguments are optional.\n\nPOI(;\n    vertices::PortaMatrix,\n    rays::PortaMatrix,\n    valid::PortaMatrix\n)\n\nThe POI struct can be initialized with either Rational{Int} or Int valued matrices. On construction, all matrix values are standardized. By default matrix elements are Int, if one field has Rational{Int} values then the entire POI struct will be converted to type Rational{Int}.\n\nFields:\n\nconv_section - each matrix row is a vertex.\ncone_section - each matrix row is a ray.\nvalid -  a feasible point for the vertex representation. In the context of a POI,       this field has no known use.\ndim - the dimension of vertices and rays. This field is auto-populated on construction.\n\nA DomainError is thrown if the column dimension of rays and vertices is not equal.\n\n\n\n\n\n","category":"type"},{"location":"exports/#XPORTA.IEQ","page":"Exports","title":"XPORTA.IEQ","text":"The intersecting halfspace representation of a polyhedron. This struct is analogous to PORTA files with the .ieq extension. Please refer to the PORTA General File Format docs for more information refarding the .ieq file format.\n\nConstructor arguments are optional.\n\nIEQ(;\n    inequalities :: PortaMatrix,\n    equalities :: PortaMatrix,\n    lower_bounds :: Matrix{Int},\n    upper_bounds :: Matrix{Int},\n    elimination_order :: Matrix{Int},\n    valid :: PortaMatrix\n)\n\nThe IEQ struct can be initialized with either Rational{Int} or Int valued matrices. On construction, all matrix values are standardized. By default matrix elements are Int, if one field has Rational{Int} values then the entire IEQ struct will be converted to type Rational{Int}.\n\nConstructor arguments inequalities and equalities each represent a linear system of the following form.\n\nbeginbmatrix\nalpha_11  dots  alpha_1M  vdots  ddots  vdots  alpha_N1  dots  alpha_NM\nendbmatrixbeginbmatrix\nx_1  vdots  x_N\nendbmatrix leq text or  =\nbeginbmatrix beta_1  vdots  beta_N endbmatrix\n\nEach matrix row represents a separate linear in/equality. The right-hand-side of each in/equality is described by a  vector vecalpha_i with length M and the right-hand-side is described with a single value beta_i, where iin1N.\n\nIn the .ieq format, columnn vector vecbeta is concatenated to the right side of the alpha matrix. In the IEQ struct, inequalities and equalities both have the following form.\n\nbeginbmatrix\nalpha_11  dots  alpha_1M  beta_1  vdots  ddots  vdots  vdots  alpha_N1  dots  alpha_NM  beta_N\nendbmatrix\n\nIEQ Fields:\n\ninequalities: each matrix row is a linear inequality, the first M elements indexed 1:(end-1) are α and the last element indexed end is β.\nequalities: each matrix row is linear equality, the first M elements indexed 1:(end-1) are α and the last element indexed end is β.\nlower_bounds: a row vector which specifies the lower bound on each individual parameter. Used for enumerating integral points with vint.\nupper_bounds: a row vector which specifies the upper bound on each individual parameter. Used for enumerating integral points with vint.\nvalid: a feasible point for the linear system.\ndim: the dimension of in/equalities, upper/lower bounds, etc. This field is auto-populated on construction.\n\nA DomainError is thrown if the column dimension of fields is not equal.\n\n\n\n\n\n","category":"type"},{"location":"exports/#Methods","page":"Exports","title":"Methods","text":"","category":"section"},{"location":"exports/","page":"Exports","title":"Exports","text":"note: Temp Files\nBy default, files created by the PORTA binaries are deleted. When performing longer computations with PORTA, it may be desirable to keep intermediate files. The argument, cleanup = false, causes XPORTA.jl methods to write files to the directory specified by the dir argument.","category":"page"},{"location":"exports/","page":"Exports","title":"Exports","text":"traf\ndim\nfmel\nvint\nportsort\nposie\nfctp","category":"page"},{"location":"exports/#XPORTA.traf","page":"Exports","title":"XPORTA.traf","text":"The traf method computes an IEQ struct given a POI struct,\n\ntraf( poi::POI; kwargs... ) :: IEQ{Rational{Int}}\n\nor computes the POI struct from the IEQ struct.\n\ntraf(ieq::IEQ; kwargs... ) :: POI{Rational{Int}}\n\nWhen converting an IEQ -> POI the valid field of the IEQ must be populated if the origin is not a feasible point of the linear system.\n\nkwargs is shorthand for the following keyword arguments:\n\ndir::String = \"./\" - The directory in which to write files.\nfilename::String = \"traf_tmp\"- The name of produced files.\ncleanup::Bool = true - If true, created files are removed after computation.\nopt_flag::String = \"\" - Optional flags to pass the traf method of the xporta binary.\nverbose::Bool = false- If true, PORTA will print progress to STDOUT.\n\nThe following excerpt from the PORTA documentation lists valid optional flags and their behavior:\n\n    -p     Unbuffered redirection of terminal messages into  file filename_'.prt'\n\n    -o     Use  a heuristic to eliminate that variable  next,  for which the number of new\n           inequalities is minimal (local criterion). If this option is set, inequalities\n           which are  recognized  to  be facet-inducing  for the finite linear system\n           are printed into a  file as soon as they are identified.\n\n    -c     Fourier-Motzkin elimination without using the rule  of Chernikov\n\n    -s     Appends a statistical  part  to  each  line  with  the number  of coefficients\n\n    -v     Printing a   table in the  output file which indicates strong validity\n\n    -l     Use  a  special  integer arithmetic allowing the integers to have arbitrary\n           lengths. This arithmetic is not as efficient as the system's integer\n           arithmetic with respect to time and storage requirements.\n\n           Note: Output values which exceed the 32-bit integer storage size\n           are written in hexadecimal format (hex). Such hexadecimal format\n           can not be reread as input.\n\nFor more details regarding traf please refer to the PORTA traf documentation.\n\n\n\n\n\n","category":"function"},{"location":"exports/#XPORTA.dim","page":"Exports","title":"XPORTA.dim","text":"dim( poi::POI; kwargs... ) :: Dict{String, Union{ Int, IEQ{Rational{Int}} } }\n\nGiven a POI computes the minimal dimension and constraining equalities for the convex hull of the POI. The returned dictionary has the form\n\nDict(\n    \"dim\" => <integer number of dimensions>,\n    \"ieq\" => <IEQ struct w/ constraining equalities>\n)\n\nkwargs specifies keyword args:\n\ndir::String = \"./\" - The directory in which to write files.\nfilename::String = \"dim_tmp\"- The name of produced files.\ncleanup::Bool = true - If true, created files are removed after computation.\nverbose::Bool = false- If true, PORTA will print progress to STDOUT.\n\nFor more details regarding dim please refer to the PORTA dim documentation.\n\n\n\n\n\n","category":"function"},{"location":"exports/#XPORTA.fmel","page":"Exports","title":"XPORTA.fmel","text":"fmel( ieq::IEQ; kwargs... ) :: IEQ{Rational{Int}}\n\nProjects the linear system of IEQ onto a subspace using fourier-motzkin elimination. The projected linear system is returned in an IEQ. Note that redundant inequalities may be present in the returned IEQ.\n\nThe elimination_order field of the IEQ must be populated and of length dim. A 0 value indicates a parameter which will not be eliminated and 1,2,... specifies the order in which the parameters will be eliminated. Performance may change based on the order of elimination.\n\nkwargs specifies keyword args:\n\ndir::String = \"./\" - The directory in which to write files.\nfilename::String = \"fmel_tmp\"- The name of produced files.\nopt_flag::String = \"\" - optional flags for the fmel subroutine.\ncleanup::Bool = true - If true, created files are removed after computation.\nverbose::Bool = false- If true, PORTA will print progress to STDOUT.\n\nA DomainError is thrown if the elimination_order field is not of length dim. A DomainError is thrown if the opt_flag argument is not a substring of \"-pcl\" or its permutations.\n\nThe valid options for the opt_flag:\n\n-p    Unbuffered redirection of the terminal messages into the file\n      input_fname_with_suffix_'prt'\n\n-c    Generation of new inequalities without the rule of Chernikov.\n\n-l    Use  a  special  integer arithmetic allowing the integers to have arbitrary\n      lengths.  This arithmetic is not as efficient as the system's integer\n      arithmetic with respect to time and storage requirements.\n\n      Note: Output values which exceed the 32-bit integer storage  size  are written\n      in hexadecimal format (hex). Such hexadecimal format can not be reread as input.\n\nFor more details regarding fmel please refer to the PORTA fmel documentation.\n\n\n\n\n\n","category":"function"},{"location":"exports/#XPORTA.vint","page":"Exports","title":"XPORTA.vint","text":"vint( ieq::IEQ; kwargs... ) :: POI{Rational{Int}}\n\nEnumerates all integral (integer) points which satisfy the linear system specified by the IEQ and bounds specified by upper_bounds and lower_bounds fields of the IEQ. These points may lie on the facets, vertices, or interior of the polytope specified by IEQ. If no equalities or inequalities are specified, all integral points within the bounds will be enumerated.\n\nkwargs specifes the keyword args:\n\ndir::String = \"./\" - The directory to which files are written.\nfilename::String = \"vint_tmp\"- The name of produced files.\ncleanup::Bool = true - If true, created files are removed after computation.\nverbose::Bool = false- If true, PORTA will print progress to STDOUT.\n\nA DomainError is thrown if the IEQ does not contain upper/lower bounds or if upper/lower bounds contain more than one row.\n\nFor more details regarding vint() please refer to the PORTA vint documentation.\n\n\n\n\n\n","category":"function"},{"location":"exports/#XPORTA.portsort","page":"Exports","title":"XPORTA.portsort","text":"portsort( ieq::IEQ; kwargs... ) :: IEQ{Rational{Int}}\n\nSorts the inequalities and equalities of the provided IEQ.\n\nportsort( poi::POI; kwargs... ) :: POI{Rational{Int}}\n\nSorts the vertices and rays of the provided POI.\n\nSorting is performed in the following hierarchy:\n\nRight-hand-side of in/equalities from high to low.\nScale factors from low to high.\nLexicographical order.\n\nkwargs is shorthand for the keyword arguments:\n\ndir::String = \"./\" - The directory in which to write files.\nfilename::String = \"portsort_tmp\"- The name of produced files.\ncleanup::Bool = true - If true, created files are removed after computation.\nverbose::Bool = false- If true, PORTA will print progress to STDOUT.\n\nFor more details regarding portsort please refer to the PORTA portsort documentation.\n\n\n\n\n\n","category":"function"},{"location":"exports/#XPORTA.posie","page":"Exports","title":"XPORTA.posie","text":"posie( ieq::IEQ, poi::POI; kwargs... ) :: POI{Rational{Int}}\n\nEnumerates the points and rays in the POI which satisfy the linear system of the IEQ. A POI containing the valid points and rays is returned.\n\nkwargs is shorthand for the following keyword arguments:\n\ndir :: String = \"./\" - The directory to which files are written.\nfilename :: String = \"posie_tmp\"- The name of produced files.\ncleanup :: Bool = true - If true, created files are removed after computation.\nverbose :: Bool = false- If true, PORTA will print progress to STDOUT.\n\nFor more details regarding posie() please refer to the PORTA posie documentation.\n\n\n\n\n\n","category":"function"},{"location":"exports/#XPORTA.fctp","page":"Exports","title":"XPORTA.fctp","text":"fctp( inequalities::PortaMatrix, poi::POI; kwargs... ) :: Dict{ String, Dict{Int, POI{Rational{Int}}} }\n\nFor the provided inequalities, determines which ones tightly bound the polytope specified by the input POI and which inequalities are violated by the input POI. Tight bounds are labeled \"valid\" and violations are labeled \"invalid\". In each case the points which saturate or violate the inequalities are returned in a poi. Inequalities which are loose bounds are not returned.\n\nEach row of the inequalities input corresponds to a distinct inequality in the form specified by the IEQ.inequalites field.\n\nThe output has a nested dictionary structure:\n\nDict(\n    \"valid\" => Dict(\n        id => saturating_poi,  # points/rays which saturate inequalities[id]\n        ...\n    ),\n    \"invalid\" => Dict(\n        id => violating_poi,   # points/rays which violate inequalities[id]\n        ...\n    )\n)\n\nwhere ineq_id corresponds to the row index of the input inequalities. The \"valid\" and \"invalid\" dictionaries may include zero or more elements.\n\nkwargs is shorthand for the following keyword arguments:\n\ndir::String = \"./\" - The directory to which files are written.\nfilename::String = \"fctp_tmp\"- The name of produced files.\ncleanup::Bool = true - If true, created files are removed after computation.\nverbose::Bool = false- If true, PORTA will print progress to STDOUT.\n\nFor more details regarding fctp() please refer to the PORTA fctp documentation.\n\n\n\n\n\n","category":"function"},{"location":"development_guide/#Development-Guide","page":"Development Guide","title":"Development Guide","text":"","category":"section"},{"location":"development_guide/#Some-notes-on-development:","page":"Development Guide","title":"Some notes on development:","text":"","category":"section"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"Features will be added on a needs basis.\nCode should be tested, documented, and organized.\nNaming schemes should follow the precedent of the PORTA software.","category":"page"},{"location":"development_guide/#Contributing","page":"Development Guide","title":"Contributing","text":"","category":"section"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"Please reach out to brian.d.doolittle@gmail.com if you are interested in making a contribution to XPORTA.jl.","category":"page"},{"location":"development_guide/#Testing","page":"Development Guide","title":"Testing","text":"","category":"section"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"All commits should be tested. Tests may be run from the command line,","category":"page"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"$ julia test/runtests.jl","category":"page"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"or via Pkg (within the julia REPL),","category":"page"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"julia> ]test XPORTA","category":"page"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"Note: the ] character invokes Pkg REPL (@v#.#) pkg>.","category":"page"},{"location":"development_guide/#Test-Types","page":"Development Guide","title":"Test Types","text":"","category":"section"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"Unit Tests test/unit/ - verify the behavior and logic of julia methods.\nIntegration Tests test/integration - verify file IO and binary execution.\nRegression Tests test/regression/ - verify the correctness of end-to-end functionality.","category":"page"},{"location":"development_guide/#Docs","page":"Development Guide","title":"Docs","text":"","category":"section"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"All features should be documented. Documentation is created using the Documenter.jl framework.","category":"page"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"To build docs locally, run","category":"page"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"$ julia docs/make.jl","category":"page"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"To locally host the docs website, navigate to /docs/build and run","category":"page"},{"location":"development_guide/","page":"Development Guide","title":"Development Guide","text":"$ python3 -m http.server --bind localhost","category":"page"},{"location":"#XPORTA.jl","page":"Home","title":"XPORTA.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A julia wrapper for the PORTA polyhedral analysis software.","category":"page"},{"location":"","page":"Home","title":"Home","text":"note: Alpha Version\nXPORTA.jl is a minimal viable product. Breaking changes may occur in future commits.","category":"page"},{"location":"#XPORTA.jl-Features","page":"Home","title":"XPORTA.jl Features","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Read/Write utilities for PORTA files.\nFile IO handler for PORTA routines.","category":"page"},{"location":"#Why-Use-XPORTA.jl?","page":"Home","title":"Why Use XPORTA.jl?","text":"","category":"section"},{"location":"#Ease-of-Use","page":"Home","title":"Ease-of-Use","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"No compilation of source code.\nNo required knowledge of the PORTA software.\nNo need to read/write files required by PORTA.","category":"page"},{"location":"#Reproducibility","page":"Home","title":"Reproducibility","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Users all run the same PORTA binaries.","category":"page"},{"location":"#PORTA-Software","page":"Home","title":"PORTA Software","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"\"A collection of [C] routines for analyzing polytopes and polyhedra.\" -(http://porta.zib.de)","category":"page"},{"location":"","page":"Home","title":"Home","text":"PORTA (POlyhedron Representation Transformation Algorithm) is a rational polyhedral solver. Polyhedra are described either by the vertex representation or by the halfspace representation. For an introduction to PORTA and polyhedral theory please review these slides.","category":"page"},{"location":"#Licensing","page":"Home","title":"Licensing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"PORTA and XPORTA.jl are licensed under the GNU General Public License (GPL) v2.0.","category":"page"},{"location":"#Acknowledgments","page":"Home","title":"Acknowledgments","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Development of XPORTA.jl was made possible by the advisory of Dr. Eric Chitambar and general support from the Physics Department at the University of Illinois Urbana-Champaign. Funding was provided by NSF Award 1914440.","category":"page"},{"location":"#Citing","page":"Home","title":"Citing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"See PORTA_CITATION.bib for the relevant references.","category":"page"},{"location":"#Contents","page":"Home","title":"Contents","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"user_guide.md\", \"exports.md\", \"Internals/wrapping_porta.md\", \"Internals/file_io.md\", \"Internals/binaries.md\", \"development_guide.md\"]\nDepth = 1","category":"page"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"#Exports","page":"Home","title":"Exports","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"exports.md\"]","category":"page"},{"location":"#File-IO","page":"Home","title":"File IO","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"Internals/file_io.md\"]","category":"page"},{"location":"#Binary-Calls","page":"Home","title":"Binary Calls","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"Internals/binaries.md\"]","category":"page"}]
}
