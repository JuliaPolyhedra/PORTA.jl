using Test, Suppressor, XPORTA

@testset "src/xporta_subroutines.jl" begin

dir = "./test/files/"

@testset "run_xporta()" begin
    @testset "throws DomainError if method_flag is not recognized" begin
        @test_throws DomainError XPORTA.run_xporta("-X", [dir *"example1.poi"])
    end

    @testset "verbose prints to STDOUT" begin
        # setup files for first run
        XPORTA.rm_porta_tmp(dir)
        XPORTA.make_porta_tmp(dir)
        ex1_poi_filepath = cp(dir*"example1.poi", dir*"porta_tmp/example1.poi")

        # stdout is returned when verbose=false (also returned when true)
        return_string = XPORTA.run_xporta("-T", [ex1_poi_filepath], verbose=false)

        # setup files for second run
        XPORTA.rm_porta_tmp(dir)
        XPORTA.make_porta_tmp(dir)
        ex1_poi_filepath = cp(dir*"example1.poi", dir*"porta_tmp/example1.poi")

        # capturing stdout when verbose=true
        capture_string = @capture_out XPORTA.run_xporta("-T", [ex1_poi_filepath], verbose=true)

        @test return_string == capture_string

        XPORTA.rm_porta_tmp(dir)
    end

    @testset "test traf (xporta -T) with example1.poi" begin
        XPORTA.rm_porta_tmp(dir)
        XPORTA.make_porta_tmp(dir)

        # copy example files into porta_tmp to avoid mutation and creation
        ex1_poi_filepath = cp(dir*"example1.poi", dir*"porta_tmp/example1.poi")

        # run xporta
        XPORTA.run_xporta("-T", [ex1_poi_filepath])

        # verify that created .ieq file contains expected results
        ieq1 = XPORTA.read_ieq(ex1_poi_filepath*".ieq")
        match_ieq1 = XPORTA.read_ieq(dir*"example1.ieq")
        @test ieq1.dim == match_ieq1.dim
        @test ieq1.inequalities == match_ieq1.inequalities
        @test ieq1.equalities == match_ieq1.equalities
        @test ieq1.lower_bounds == match_ieq1.lower_bounds
        @test ieq1.upper_bounds == match_ieq1.upper_bounds
        @test ieq1.elimination_order == match_ieq1.elimination_order
        @test ieq1.valid == match_ieq1.valid

        XPORTA.rm_porta_tmp(dir)
    end

    @testset "test traf (xporta -T) with example2.ieq" begin
        XPORTA.rm_porta_tmp(dir)
        XPORTA.make_porta_tmp(dir)

        ex2_ieq_filepath = cp(dir*"example2.ieq", dir*"porta_tmp/example2.ieq")

        XPORTA.run_xporta("-T", [ex2_ieq_filepath])

        # reading .poi files
        poi2 = XPORTA.read_poi(ex2_ieq_filepath*".poi")
        poi2_match = XPORTA.read_poi(dir*"example2.poi")

        @test poi2.dim == poi2_match.dim
        @test poi2.cone_section == poi2_match.cone_section
        @test poi2.conv_section == poi2_match.conv_section
        @test poi2.valid == poi2_match.valid

        XPORTA.rm_porta_tmp(dir)
    end
end

@testset "traf()" begin
    @testset "test cleanup true/false" begin
        XPORTA.rm_porta_tmp(dir)
        @test !isdir(dir*"porta_tmp")
        pre_dir_length = length(readdir(dir))

        traf(POI(vertices = [1 0 0;0 1 0;0 0 1]), dir=dir, filename="traf_test_cleanup")
        traf(IEQ(inequalities = [1 0 0 0;0 0 1 0]), dir=dir, filename="traf_test_cleanup")

        post_dir_length = length(readdir(dir))

        @test pre_dir_length == post_dir_length
        @test !isdir(dir*"porta_tmp")

        pre_dir_length = length(readdir(dir))

        traf(POI(vertices = [1 0 0;0 1 0;0 0 1]), dir=dir, filename="traf_test_cleanup", cleanup=false)
        traf(IEQ(inequalities = [1 0 0 0;0 0 1 0]), dir=dir, filename="traf_test_cleanup", cleanup=false)

        post_dir_length = length(readdir(dir))

        @test pre_dir_length + 4 == post_dir_length
        @test !isdir(dir*"porta_tmp")
        @test isfile(dir * "traf_test_cleanup.poi")
        @test isfile(dir * "traf_test_cleanup.poi.ieq")
        @test isfile(dir * "traf_test_cleanup.ieq")
        @test isfile(dir * "traf_test_cleanup.ieq.poi")

        # removing created fileds
        rm(dir * "traf_test_cleanup.poi")
        rm(dir * "traf_test_cleanup.poi.ieq")
        rm(dir * "traf_test_cleanup.ieq")
        rm(dir * "traf_test_cleanup.ieq.poi")
        @test pre_dir_length == length(readdir(dir))

        XPORTA.rm_porta_tmp(dir)
    end

    @testset "example1.poi" begin
        ex1_poi = XPORTA.read_poi(dir*"example1.poi")
        ex1_ieq_match = XPORTA.read_ieq(dir*"example1.ieq")

        ex1_ieq = traf(ex1_poi, dir=dir)

        @test ex1_ieq.dim == ex1_ieq_match.dim
        @test ex1_ieq.inequalities == ex1_ieq_match.inequalities
        @test ex1_ieq.equalities == ex1_ieq_match.equalities
        @test ex1_ieq.valid == ex1_ieq_match.valid
        @test ex1_ieq.upper_bounds == ex1_ieq_match.upper_bounds
        @test ex1_ieq.lower_bounds == ex1_ieq_match.lower_bounds
        @test ex1_ieq.elimination_order == ex1_ieq_match.elimination_order
    end

    @testset "example2.poi" begin
        ex2_poi = XPORTA.read_poi(dir*"example2.poi")
        ex2_ieq_match = XPORTA.read_ieq(dir*"example2.ieq")

        ex2_ieq = traf(ex2_poi, dir=dir)

        @test ex2_ieq.dim == ex2_ieq_match.dim
        @test ex2_ieq.inequalities[1:3,:] == ex2_ieq_match.inequalities[1:3,:]
        @test ex2_ieq.inequalities[4,:] == ex2_ieq_match.inequalities[4,:].*15 # last inequality is equivalent upto a global scalar
        @test ex2_ieq.equalities == ex2_ieq_match.equalities
        @test ex2_ieq.valid != ex2_ieq_match.valid

        # both valid points are valid
        @test all(map( row_id ->
            sum(ex2_ieq.inequalities[row_id,1:end-1]'.*ex2_ieq.valid) <= ex2_ieq.inequalities[row_id,end],
            1:size(ex2_ieq.inequalities)[1]
        ))

        @test all(map( row_id ->
            sum(ex2_ieq_match.inequalities[row_id,1:end-1]'.*ex2_ieq_match.valid) <= ex2_ieq_match.inequalities[row_id,end],
            1:size(ex2_ieq_match.inequalities)[1]
        ))
    end

    @testset "example1.ieq" begin
        ex1_ieq = XPORTA.read_ieq(dir*"example1.ieq")
        ex1_poi_match = XPORTA.read_poi(dir*"example1.poi")

        ex1_poi = traf(ex1_ieq, dir=dir)

        @test ex1_poi.dim == ex1_poi_match.dim
        @test ex1_poi.valid == ex1_poi_match.valid
        @test ex1_poi.conv_section[1] == ex1_poi_match.conv_section[1]
        @test ex1_poi.conv_section[2] == ex1_poi_match.conv_section[3]
        @test ex1_poi.conv_section[3] == ex1_poi_match.conv_section[2]
        @test ex1_poi.cone_section == ex1_poi_match.cone_section*3/2
    end

    @testset "example2.ieq" begin
        ex2_ieq = XPORTA.read_ieq(dir*"example2.ieq")
        ex2_poi_match = XPORTA.read_poi(dir*"example2.poi")

        ex2_poi = traf(ex2_ieq, dir=dir)

        @test ex2_poi.dim == ex2_poi_match.dim
        @test ex2_poi.valid == ex2_poi_match.valid
        @test ex2_poi.conv_section == ex2_poi_match.conv_section
        @test ex2_poi.cone_section == ex2_poi_match.cone_section
    end

    @testset "opt_arg flags" begin
        @testset "invalid options" begin
            @test_throws DomainError traf(POI(vertices=[1 0 0;0 1 0;0 0 1]), dir=dir, opt_flag="p")
            @test_throws DomainError traf(POI(vertices=[1 0 0;0 1 0;0 0 1]), dir=dir, opt_flag="-pop")
            @test_throws DomainError traf(POI(vertices=[1 0 0;0 1 0;0 0 1]), dir=dir, opt_flag="-x")

            @test_throws DomainError traf(IEQ(inequalities=[-1 0 0;0 -1 0]), dir=dir, opt_flag="p")
            @test_throws DomainError traf(IEQ(inequalities=[-1 0 0;0 -1 0]), dir=dir, opt_flag="-pop")
            @test_throws DomainError traf(IEQ(inequalities=[-1 0 0;0 -1 0]), dir=dir, opt_flag="-x")
        end

        @testset "-p flag will suppress output" begin
            tmpdir = XPORTA.make_porta_tmp(dir)

            traf(POI(vertices=[1 0 0;0 1 0;0 0 1]), dir=tmpdir, opt_flag="-p", cleanup=false)

            @test isfile(tmpdir * "/traf_tmp.poi.prt")
            XPORTA.rm_porta_tmp(dir)

            tmpdir = XPORTA.make_porta_tmp(dir)

            traf(IEQ(inequalities=[-1 0 0;0 -1 0]), dir=tmpdir, opt_flag="-p", cleanup=false)

            @test isfile(tmpdir * "/traf_tmp.ieq.prt")
            XPORTA.rm_porta_tmp(dir)
        end
    end
end

@testset "portsort()" begin
    @testset "ieq inputs" begin
        @testset "sorts inequalities by scale factor (high to low)" begin
            sort_ieq = portsort(IEQ(inequalities=[-1 0 0 0;-2 0 0 0;1 0 0 0], equalities=[1 0 -1 0;2 0 -1 0]), dir=dir)
            @test sort_ieq.inequalities == [1 0 0 0;-1 0 0 0;-2 0 0 0]
            @test sort_ieq.equalities == [2 0 -1 0;1 0 -1 0]

            sort_ieq = portsort(IEQ(inequalities=[3 0 0 0;0 2 0 0;0 0 1 0]), dir=dir)
            @test sort_ieq.inequalities == [3 0 0 0;0 2 0 0;0 0 1 0]
        end

        @testset "sorts inequalities by lexicographical order" begin
            sort_ieq = portsort(IEQ(inequalities=[0 -1 0 0;-1 0 0 0;0 0 -1 0], equalities = [2 0 -1 0;2 -1 0 0]), dir=dir)
            @test sort_ieq.inequalities == [-1 0 0 0;0 -1 0 0;0 0 -1 0]
            @test sort_ieq.equalities == [2 -1 0 0;2 0 -1 0]
        end

        @testset "sorts inequalites by rhs bound (low to high)" begin
            sort_ieq = portsort(IEQ(inequalities=[-1 0 0 3;-1 0 0 2;-1 0 0 1], equalities = [1 1 1 1;1 1 1 -1]), dir=dir)
            @test sort_ieq.inequalities == [-1 0 0 1;-1 0 0 2;-1 0 0 3]
            @test sort_ieq.equalities == [1 1 1 -1;1 1 1 1]
        end

        @testset "sorts inequalities by scale factor over lexicographical order" begin
            sort_ieq = portsort(IEQ(inequalities=[-3 0 0 0;0 -2 0 0;0 0 -1 0]), dir=dir)
            @test sort_ieq.inequalities == [0 0 -1 0;0 -2 0 0;-3 0 0 0]
        end

        @testset "sorts inequalities by rhs bound, scale factor, then lexicographical order" begin
            sort_ieq = portsort(IEQ(inequalities=[0 -3 0 0;0 -1 0 2;0 -1 0 1;-2 0 0 2]), dir=dir)
            @test sort_ieq.inequalities == [0 -3 0 0;0 -1 0 1;0 -1 0 2;-2 0 0 2]
        end
    end

    @testset "poi inputs" begin
        @testset "sorts points by scale factor (high to low)" begin
            sort_poi = portsort(POI(vertices=[-1 0 0 0;-2 0 0 0;1 0 0 0], rays=[0 1 0 0;0 2 0 0;0 3 0 0]), dir=dir)
            @test sort_poi.conv_section == [1 0 0 0;-1 0 0 0;-2 0 0 0]
            @test sort_poi.cone_section == [0 3 0 0;0 2 0 0;0 1 0 0]

            sort_poi = portsort(POI(vertices=[3 0 0 0;0 2 0 0;0 0 1 0]), dir=dir)
            @test sort_poi.conv_section == [3 0 0 0;0 2 0 0;0 0 1 0]
        end

        @testset "sorts points by lexicographical order" begin
            sort_poi = portsort(POI(vertices=[0 -1 0 0;-1 0 0 0;0 0 -1 0]), dir=dir)
            @test sort_poi.conv_section == [-1 0 0 0;0 -1 0 0;0 0 -1 0]
        end

        @testset "sorts points by scale factor over lexicographical order" begin
            sort_poi = portsort(POI(vertices=[-3 0 0 0;0 -2 0 0;0 0 -1 0], rays=[0 0 0 3;1 0 0 0;0 -1 0 0]), dir=dir)
            @test sort_poi.conv_section == [0 0 -1 0;0 -2 0 0;-3 0 0 0]
            @test sort_poi.cone_section ==  [0 0 0 3;1 0 0 0;0 -1 0 0]

            sort_poi = portsort(POI(vertices=[0 -3 0 0;0 -1 0 2;0 -1 0 1;-2 0 0 2]), dir=dir)
            @test sort_poi.conv_section == [0 -1 0 2;0 -1 0 1;-2 0 0 2;0 -3 0 0]
        end
    end
end

@testset "dim()" begin

    @testset "cube" begin
        cube_poi = POI(vertices=[
            1 1 1; 1 1 -1; 1 -1 1; 1 -1 -1;
            -1 1 1; -1 1 -1; -1 -1 1; -1 -1 -1;
        ])

        dim_dict = dim(cube_poi, dir=dir)

        @test dim_dict["dim"] == 3
        @test dim_dict["ieq"].dim == 3
        @test dim_dict["ieq"].equalities == Matrix{Rational{Int}}(undef, (0,4))
    end

    @testset "3-simplex in 3 dimensions" begin
        dim_dict = dim(POI(vertices=[1 0 0;0 1 0;0 0 1]), dir=dir)
        @test dim_dict["dim"] == 2
        @test dim_dict["ieq"].dim == 3
        @test dim_dict["ieq"].equalities == [1 1 1 1]
    end

    @testset "3-simplex in 9 dimensions" begin
        dim_dict = dim(POI(vertices = [
            1 1 1 0 0 0 0 0 0;
            0 0 0 1 1 1 0 0 0;
            0 0 0 0 0 0 1 1 1;
        ]), dir=dir)

        @test length(dim_dict) == 2
        @test dim_dict["dim"] == 2
        @test dim_dict["ieq"].dim == 9
        @test dim_dict["ieq"].equalities == [
            0 0 0 0 0 0 0 1 -1 0;
            0 0 0 0 0 0 1 -1 0 0;
            0 0 0 0 1 -1 0 0 0 0;
            0 0 0 1 -1 0 0 0 0 0;
            0 1 -1 0 0 0 0 0 0 0;
            1 -1 0 0 0 0 0 0 0 0;
            0 0 1 0 0 1 0 0 1 1;
        ]
    end
end

@testset "fmel()" begin
    @testset "invalid elimination order fields" begin
        # too short
        @test_throws DomainError fmel(IEQ(inequalities = [-1 0 1; 0 -1 1]), dir=dir)
        # too long
        @test_throws DomainError fmel(IEQ(inequalities =[-1 0 1; 0 -1 1], elimination_order = [1 2 0]), dir=dir)
        # too many rows
        @test_throws DomainError fmel(IEQ(inequalities =[-1 0 1; 0 -1 1], elimination_order = [1 0;0 1]), dir=dir)
    end

    @testset "invalid opt_flag" begin
        @test_throws DomainError fmel(IEQ(inequalities = [-1 0 1; 0 -1 1], elimination_order=[1 0]), dir=dir, opt_flag="c")
        @test_throws DomainError fmel(IEQ(inequalities = [-1 0 1; 0 -1 1], elimination_order=[1 0]), dir=dir, opt_flag="-x")
        @test_throws DomainError fmel(IEQ(inequalities = [-1 0 1; 0 -1 1], elimination_order=[1 0]), dir=dir, opt_flag="-pcll")
        @test_throws DomainError fmel(IEQ(inequalities = [-1 0 1; 0 -1 1], elimination_order=[1 0]), dir=dir, opt_flag="-cc")
        @test_throws DomainError fmel(IEQ(inequalities = [-1 0 1; 0 -1 1], elimination_order=[1 0]), dir=dir, opt_flag="-pcx")
    end

    @testset "octahedron projections" begin
        octahedron_ineqs = [
            1 1 1 1; -1 1 1 1; 1 -1 1 1; 1 1 -1 1;
            -1 -1 1 1; -1 1 -1 1; 1 -1 -1 1; -1 -1 -1 1;
        ]

        @testset "project onto coordinate 3" begin
            fmel_ieq = fmel(IEQ(inequalities = octahedron_ineqs, elimination_order = [1 2 0]), dir=dir)
            @test fmel_ieq.dim == 3
            @test fmel_ieq.inequalities == [
                0 0 0 1; 0 0 1 1; 0 0 1 1; 0 0 -1 1; 0 0 -1 1
            ]
        end

        @testset "project onto coordinate 3 (switched order of elimination)" begin
            fmel_ieq = fmel(IEQ(inequalities = octahedron_ineqs, elimination_order = [2 1 0]), dir=dir)
            @test fmel_ieq.dim == 3
            @test fmel_ieq.inequalities == [
                0 0 0 1; 0 0 1 1; 0 0 1 1; 0 0 -1 1; 0 0 -1 1
            ]
        end

        @testset "projection onto coordinate 1" begin
            fmel_ieq = fmel(IEQ(inequalities = octahedron_ineqs, elimination_order = [0 1 2]), dir=dir)
            @test fmel_ieq.dim == 3
            @test fmel_ieq.inequalities == [
                0 0 0 1; 0 0 0 1; 1 0 0 1; 1 0 0 1; -1 0 0 1; -1 0 0 1
            ]
        end

        @testset "projection onto coordinate 2" begin
            fmel_ieq = fmel(IEQ(inequalities = octahedron_ineqs, elimination_order = [1 0 2]), dir=dir)
            @test fmel_ieq.dim == 3
            @test fmel_ieq.inequalities == [
                0 0 0 1; 0 0 0 1; 0 1 0 1; 0 1 0 1; 0 -1 0 1; 0 -1 0 1
            ]
        end

        @testset "projection onto coordinates 2,3 " begin
            fmel_ieq = fmel(IEQ(inequalities = octahedron_ineqs, elimination_order = [1 0 0]), dir=dir)
            @test fmel_ieq.dim == 3
            @test fmel_ieq.inequalities == [
                0 0 1 1; 0 0 1 1; 0 1 0 1; 0 1 0 1; 0 1 1 1; 0 -1 0 1; 0 -1 0 1;
                0 0 -1 1; 0 0 -1 1; 0 -1 1 1; 0 1 -1 1; 0 -1 -1 1;
            ]
        end

        @testset "inequalities return if no terms eliminated" begin
            fmel_ieq = fmel(IEQ(inequalities = octahedron_ineqs, elimination_order = [0 0 0]), dir=dir)
            @test fmel_ieq.dim == 3
            @test fmel_ieq.inequalities == octahedron_ineqs
        end

        @testset "many redundant inequalities without rule of chernikov" begin
            fmel_ieq = fmel(IEQ(inequalities = octahedron_ineqs, elimination_order = [1 2 0]), dir=dir, opt_flag="-c")
            @test fmel_ieq.dim == 3
            @test fmel_ieq.inequalities == [
                0 0 0 1;0 0 0 1;0 0 0 1;0 0 1 1;0 0 1 1;0 0 1 1;
                0 0 -1 1;0 0 -1 1;0 0 -1 1;0 0 1 2;0 0 1 2;0 0 1 2;
                0 0 1 2;0 0 -1 2;0 0 -1 2;0 0 -1 2; 0 0 -1 2;
            ]
        end
    end
end

end
