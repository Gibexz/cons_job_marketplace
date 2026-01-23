import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type JobModel = runtime.Types.Result.DefaultSelection<Prisma.$JobPayload>;
export type AggregateJob = {
    _count: JobCountAggregateOutputType | null;
    _min: JobMinAggregateOutputType | null;
    _max: JobMaxAggregateOutputType | null;
};
export type JobMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    company: string | null;
    postedById: string | null;
    createdAt: Date | null;
};
export type JobMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    company: string | null;
    postedById: string | null;
    createdAt: Date | null;
};
export type JobCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    company: number;
    postedById: number;
    createdAt: number;
    _all: number;
};
export type JobMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    company?: true;
    postedById?: true;
    createdAt?: true;
};
export type JobMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    company?: true;
    postedById?: true;
    createdAt?: true;
};
export type JobCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    company?: true;
    postedById?: true;
    createdAt?: true;
    _all?: true;
};
export type JobAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput | Prisma.JobOrderByWithRelationInput[];
    cursor?: Prisma.JobWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobCountAggregateInputType;
    _min?: JobMinAggregateInputType;
    _max?: JobMaxAggregateInputType;
};
export type GetJobAggregateType<T extends JobAggregateArgs> = {
    [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJob[P]> : Prisma.GetScalarType<T[P], AggregateJob[P]>;
};
export type JobGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithAggregationInput | Prisma.JobOrderByWithAggregationInput[];
    by: Prisma.JobScalarFieldEnum[] | Prisma.JobScalarFieldEnum;
    having?: Prisma.JobScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobCountAggregateInputType | true;
    _min?: JobMinAggregateInputType;
    _max?: JobMaxAggregateInputType;
};
export type JobGroupByOutputType = {
    id: string;
    title: string;
    description: string;
    company: string | null;
    postedById: string;
    createdAt: Date;
    _count: JobCountAggregateOutputType | null;
    _min: JobMinAggregateOutputType | null;
    _max: JobMaxAggregateOutputType | null;
};
type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobGroupByOutputType[P]>;
}>>;
export type JobWhereInput = {
    AND?: Prisma.JobWhereInput | Prisma.JobWhereInput[];
    OR?: Prisma.JobWhereInput[];
    NOT?: Prisma.JobWhereInput | Prisma.JobWhereInput[];
    id?: Prisma.StringFilter<"Job"> | string;
    title?: Prisma.StringFilter<"Job"> | string;
    description?: Prisma.StringFilter<"Job"> | string;
    company?: Prisma.StringNullableFilter<"Job"> | string | null;
    postedById?: Prisma.StringFilter<"Job"> | string;
    createdAt?: Prisma.DateTimeFilter<"Job"> | Date | string;
    postedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type JobOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    company?: Prisma.SortOrderInput | Prisma.SortOrder;
    postedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postedBy?: Prisma.UserOrderByWithRelationInput;
};
export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.JobWhereInput | Prisma.JobWhereInput[];
    OR?: Prisma.JobWhereInput[];
    NOT?: Prisma.JobWhereInput | Prisma.JobWhereInput[];
    title?: Prisma.StringFilter<"Job"> | string;
    description?: Prisma.StringFilter<"Job"> | string;
    company?: Prisma.StringNullableFilter<"Job"> | string | null;
    postedById?: Prisma.StringFilter<"Job"> | string;
    createdAt?: Prisma.DateTimeFilter<"Job"> | Date | string;
    postedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type JobOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    company?: Prisma.SortOrderInput | Prisma.SortOrder;
    postedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.JobCountOrderByAggregateInput;
    _max?: Prisma.JobMaxOrderByAggregateInput;
    _min?: Prisma.JobMinOrderByAggregateInput;
};
export type JobScalarWhereWithAggregatesInput = {
    AND?: Prisma.JobScalarWhereWithAggregatesInput | Prisma.JobScalarWhereWithAggregatesInput[];
    OR?: Prisma.JobScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JobScalarWhereWithAggregatesInput | Prisma.JobScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Job"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Job"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Job"> | string;
    company?: Prisma.StringNullableWithAggregatesFilter<"Job"> | string | null;
    postedById?: Prisma.StringWithAggregatesFilter<"Job"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Job"> | Date | string;
};
export type JobCreateInput = {
    id?: string;
    title: string;
    description: string;
    company?: string | null;
    createdAt?: Date | string;
    postedBy: Prisma.UserCreateNestedOneWithoutJobsInput;
};
export type JobUncheckedCreateInput = {
    id?: string;
    title: string;
    description: string;
    company?: string | null;
    postedById: string;
    createdAt?: Date | string;
};
export type JobUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postedBy?: Prisma.UserUpdateOneRequiredWithoutJobsNestedInput;
};
export type JobUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobCreateManyInput = {
    id?: string;
    title: string;
    description: string;
    company?: string | null;
    postedById: string;
    createdAt?: Date | string;
};
export type JobUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobListRelationFilter = {
    every?: Prisma.JobWhereInput;
    some?: Prisma.JobWhereInput;
    none?: Prisma.JobWhereInput;
};
export type JobOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type JobCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    postedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type JobMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    postedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type JobMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    postedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type JobCreateNestedManyWithoutPostedByInput = {
    create?: Prisma.XOR<Prisma.JobCreateWithoutPostedByInput, Prisma.JobUncheckedCreateWithoutPostedByInput> | Prisma.JobCreateWithoutPostedByInput[] | Prisma.JobUncheckedCreateWithoutPostedByInput[];
    connectOrCreate?: Prisma.JobCreateOrConnectWithoutPostedByInput | Prisma.JobCreateOrConnectWithoutPostedByInput[];
    createMany?: Prisma.JobCreateManyPostedByInputEnvelope;
    connect?: Prisma.JobWhereUniqueInput | Prisma.JobWhereUniqueInput[];
};
export type JobUncheckedCreateNestedManyWithoutPostedByInput = {
    create?: Prisma.XOR<Prisma.JobCreateWithoutPostedByInput, Prisma.JobUncheckedCreateWithoutPostedByInput> | Prisma.JobCreateWithoutPostedByInput[] | Prisma.JobUncheckedCreateWithoutPostedByInput[];
    connectOrCreate?: Prisma.JobCreateOrConnectWithoutPostedByInput | Prisma.JobCreateOrConnectWithoutPostedByInput[];
    createMany?: Prisma.JobCreateManyPostedByInputEnvelope;
    connect?: Prisma.JobWhereUniqueInput | Prisma.JobWhereUniqueInput[];
};
export type JobUpdateManyWithoutPostedByNestedInput = {
    create?: Prisma.XOR<Prisma.JobCreateWithoutPostedByInput, Prisma.JobUncheckedCreateWithoutPostedByInput> | Prisma.JobCreateWithoutPostedByInput[] | Prisma.JobUncheckedCreateWithoutPostedByInput[];
    connectOrCreate?: Prisma.JobCreateOrConnectWithoutPostedByInput | Prisma.JobCreateOrConnectWithoutPostedByInput[];
    upsert?: Prisma.JobUpsertWithWhereUniqueWithoutPostedByInput | Prisma.JobUpsertWithWhereUniqueWithoutPostedByInput[];
    createMany?: Prisma.JobCreateManyPostedByInputEnvelope;
    set?: Prisma.JobWhereUniqueInput | Prisma.JobWhereUniqueInput[];
    disconnect?: Prisma.JobWhereUniqueInput | Prisma.JobWhereUniqueInput[];
    delete?: Prisma.JobWhereUniqueInput | Prisma.JobWhereUniqueInput[];
    connect?: Prisma.JobWhereUniqueInput | Prisma.JobWhereUniqueInput[];
    update?: Prisma.JobUpdateWithWhereUniqueWithoutPostedByInput | Prisma.JobUpdateWithWhereUniqueWithoutPostedByInput[];
    updateMany?: Prisma.JobUpdateManyWithWhereWithoutPostedByInput | Prisma.JobUpdateManyWithWhereWithoutPostedByInput[];
    deleteMany?: Prisma.JobScalarWhereInput | Prisma.JobScalarWhereInput[];
};
export type JobUncheckedUpdateManyWithoutPostedByNestedInput = {
    create?: Prisma.XOR<Prisma.JobCreateWithoutPostedByInput, Prisma.JobUncheckedCreateWithoutPostedByInput> | Prisma.JobCreateWithoutPostedByInput[] | Prisma.JobUncheckedCreateWithoutPostedByInput[];
    connectOrCreate?: Prisma.JobCreateOrConnectWithoutPostedByInput | Prisma.JobCreateOrConnectWithoutPostedByInput[];
    upsert?: Prisma.JobUpsertWithWhereUniqueWithoutPostedByInput | Prisma.JobUpsertWithWhereUniqueWithoutPostedByInput[];
    createMany?: Prisma.JobCreateManyPostedByInputEnvelope;
    set?: Prisma.JobWhereUniqueInput | Prisma.JobWhereUniqueInput[];
    disconnect?: Prisma.JobWhereUniqueInput | Prisma.JobWhereUniqueInput[];
    delete?: Prisma.JobWhereUniqueInput | Prisma.JobWhereUniqueInput[];
    connect?: Prisma.JobWhereUniqueInput | Prisma.JobWhereUniqueInput[];
    update?: Prisma.JobUpdateWithWhereUniqueWithoutPostedByInput | Prisma.JobUpdateWithWhereUniqueWithoutPostedByInput[];
    updateMany?: Prisma.JobUpdateManyWithWhereWithoutPostedByInput | Prisma.JobUpdateManyWithWhereWithoutPostedByInput[];
    deleteMany?: Prisma.JobScalarWhereInput | Prisma.JobScalarWhereInput[];
};
export type JobCreateWithoutPostedByInput = {
    id?: string;
    title: string;
    description: string;
    company?: string | null;
    createdAt?: Date | string;
};
export type JobUncheckedCreateWithoutPostedByInput = {
    id?: string;
    title: string;
    description: string;
    company?: string | null;
    createdAt?: Date | string;
};
export type JobCreateOrConnectWithoutPostedByInput = {
    where: Prisma.JobWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobCreateWithoutPostedByInput, Prisma.JobUncheckedCreateWithoutPostedByInput>;
};
export type JobCreateManyPostedByInputEnvelope = {
    data: Prisma.JobCreateManyPostedByInput | Prisma.JobCreateManyPostedByInput[];
    skipDuplicates?: boolean;
};
export type JobUpsertWithWhereUniqueWithoutPostedByInput = {
    where: Prisma.JobWhereUniqueInput;
    update: Prisma.XOR<Prisma.JobUpdateWithoutPostedByInput, Prisma.JobUncheckedUpdateWithoutPostedByInput>;
    create: Prisma.XOR<Prisma.JobCreateWithoutPostedByInput, Prisma.JobUncheckedCreateWithoutPostedByInput>;
};
export type JobUpdateWithWhereUniqueWithoutPostedByInput = {
    where: Prisma.JobWhereUniqueInput;
    data: Prisma.XOR<Prisma.JobUpdateWithoutPostedByInput, Prisma.JobUncheckedUpdateWithoutPostedByInput>;
};
export type JobUpdateManyWithWhereWithoutPostedByInput = {
    where: Prisma.JobScalarWhereInput;
    data: Prisma.XOR<Prisma.JobUpdateManyMutationInput, Prisma.JobUncheckedUpdateManyWithoutPostedByInput>;
};
export type JobScalarWhereInput = {
    AND?: Prisma.JobScalarWhereInput | Prisma.JobScalarWhereInput[];
    OR?: Prisma.JobScalarWhereInput[];
    NOT?: Prisma.JobScalarWhereInput | Prisma.JobScalarWhereInput[];
    id?: Prisma.StringFilter<"Job"> | string;
    title?: Prisma.StringFilter<"Job"> | string;
    description?: Prisma.StringFilter<"Job"> | string;
    company?: Prisma.StringNullableFilter<"Job"> | string | null;
    postedById?: Prisma.StringFilter<"Job"> | string;
    createdAt?: Prisma.DateTimeFilter<"Job"> | Date | string;
};
export type JobCreateManyPostedByInput = {
    id?: string;
    title: string;
    description: string;
    company?: string | null;
    createdAt?: Date | string;
};
export type JobUpdateWithoutPostedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobUncheckedUpdateWithoutPostedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobUncheckedUpdateManyWithoutPostedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    company?: boolean;
    postedById?: boolean;
    createdAt?: boolean;
    postedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["job"]>;
export type JobSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    company?: boolean;
    postedById?: boolean;
    createdAt?: boolean;
    postedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["job"]>;
export type JobSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    company?: boolean;
    postedById?: boolean;
    createdAt?: boolean;
    postedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["job"]>;
export type JobSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    company?: boolean;
    postedById?: boolean;
    createdAt?: boolean;
};
export type JobOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "company" | "postedById" | "createdAt", ExtArgs["result"]["job"]>;
export type JobInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    postedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type JobIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    postedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type JobIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    postedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $JobPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Job";
    objects: {
        postedBy: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        description: string;
        company: string | null;
        postedById: string;
        createdAt: Date;
    }, ExtArgs["result"]["job"]>;
    composites: {};
};
export type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JobPayload, S>;
export type JobCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobCountAggregateInputType | true;
};
export interface JobDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Job'];
        meta: {
            name: 'Job';
        };
    };
    findUnique<T extends JobFindUniqueArgs>(args: Prisma.SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JobFindFirstArgs>(args?: Prisma.SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JobFindManyArgs>(args?: Prisma.SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JobCreateArgs>(args: Prisma.SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JobCreateManyArgs>(args?: Prisma.SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends JobDeleteArgs>(args: Prisma.SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JobUpdateArgs>(args: Prisma.SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JobDeleteManyArgs>(args?: Prisma.SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JobUpdateManyArgs>(args: Prisma.SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends JobUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, JobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends JobUpsertArgs>(args: Prisma.SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma.Prisma__JobClient<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JobCountArgs>(args?: Prisma.Subset<T, JobCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobCountAggregateOutputType> : number>;
    aggregate<T extends JobAggregateArgs>(args: Prisma.Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>;
    groupBy<T extends JobGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JobGroupByArgs['orderBy'];
    } : {
        orderBy?: JobGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JobFieldRefs;
}
export interface Prisma__JobClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    postedBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JobFieldRefs {
    readonly id: Prisma.FieldRef<"Job", 'String'>;
    readonly title: Prisma.FieldRef<"Job", 'String'>;
    readonly description: Prisma.FieldRef<"Job", 'String'>;
    readonly company: Prisma.FieldRef<"Job", 'String'>;
    readonly postedById: Prisma.FieldRef<"Job", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Job", 'DateTime'>;
}
export type JobFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    where: Prisma.JobWhereUniqueInput;
};
export type JobFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    where: Prisma.JobWhereUniqueInput;
};
export type JobFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput | Prisma.JobOrderByWithRelationInput[];
    cursor?: Prisma.JobWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobScalarFieldEnum | Prisma.JobScalarFieldEnum[];
};
export type JobFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput | Prisma.JobOrderByWithRelationInput[];
    cursor?: Prisma.JobWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobScalarFieldEnum | Prisma.JobScalarFieldEnum[];
};
export type JobFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput | Prisma.JobOrderByWithRelationInput[];
    cursor?: Prisma.JobWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobScalarFieldEnum | Prisma.JobScalarFieldEnum[];
};
export type JobCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobCreateInput, Prisma.JobUncheckedCreateInput>;
};
export type JobCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JobCreateManyInput | Prisma.JobCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JobCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    data: Prisma.JobCreateManyInput | Prisma.JobCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.JobIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type JobUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobUpdateInput, Prisma.JobUncheckedUpdateInput>;
    where: Prisma.JobWhereUniqueInput;
};
export type JobUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JobUpdateManyMutationInput, Prisma.JobUncheckedUpdateManyInput>;
    where?: Prisma.JobWhereInput;
    limit?: number;
};
export type JobUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobUpdateManyMutationInput, Prisma.JobUncheckedUpdateManyInput>;
    where?: Prisma.JobWhereInput;
    limit?: number;
    include?: Prisma.JobIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type JobUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    where: Prisma.JobWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobCreateInput, Prisma.JobUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JobUpdateInput, Prisma.JobUncheckedUpdateInput>;
};
export type JobDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
    where: Prisma.JobWhereUniqueInput;
};
export type JobDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWhereInput;
    limit?: number;
};
export type JobDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobSelect<ExtArgs> | null;
    omit?: Prisma.JobOmit<ExtArgs> | null;
    include?: Prisma.JobInclude<ExtArgs> | null;
};
export {};
