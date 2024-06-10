create type "public"."check_status" as enum ('online', 'down', 'silence', 'pending', 'error');

create table "public"."checks" (
    "id" uuid not null default gen_random_uuid(),
    "completed" boolean not null default false,
    "stream" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "status" check_status not null default 'pending'::check_status,
    "account_id" uuid not null
);

alter table "public"."checks" enable row level security;

create table "public"."streams" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(500) not null,
    "url" character varying(50000) not null,
    "account_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "status" check_status not null default 'pending'::check_status,
    "last_outage" timestamp with time zone,
    "last_online" timestamp with time zone,
    "last_check" timestamp with time zone
);

alter table "public"."streams" enable row level security;

CREATE UNIQUE INDEX checks_pkey ON public.checks USING btree (id);

CREATE UNIQUE INDEX streams_pkey ON public.streams USING btree (id);

alter table "public"."checks" add constraint "checks_pkey" PRIMARY KEY using index "checks_pkey";

alter table "public"."streams" add constraint "streams_pkey" PRIMARY KEY using index "streams_pkey";

alter table "public"."checks" add constraint "checks_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) not valid;

alter table "public"."checks" validate constraint "checks_account_id_fkey";

alter table "public"."checks" add constraint "checks_stream_fkey" FOREIGN KEY (stream) REFERENCES streams(id) not valid;

alter table "public"."checks" validate constraint "checks_stream_fkey";

alter table "public"."streams" add constraint "streams_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) not valid;

alter table "public"."streams" validate constraint "streams_account_id_fkey";

grant delete on table "public"."checks" to "anon";

grant insert on table "public"."checks" to "anon";

grant references on table "public"."checks" to "anon";

grant select on table "public"."checks" to "anon";

grant trigger on table "public"."checks" to "anon";

grant truncate on table "public"."checks" to "anon";

grant update on table "public"."checks" to "anon";

grant delete on table "public"."checks" to "authenticated";

grant insert on table "public"."checks" to "authenticated";

grant references on table "public"."checks" to "authenticated";

grant select on table "public"."checks" to "authenticated";

grant trigger on table "public"."checks" to "authenticated";

grant truncate on table "public"."checks" to "authenticated";

grant update on table "public"."checks" to "authenticated";

grant delete on table "public"."checks" to "service_role";

grant insert on table "public"."checks" to "service_role";

grant references on table "public"."checks" to "service_role";

grant select on table "public"."checks" to "service_role";

grant trigger on table "public"."checks" to "service_role";

grant truncate on table "public"."checks" to "service_role";

grant update on table "public"."checks" to "service_role";

grant delete on table "public"."streams" to "anon";

grant insert on table "public"."streams" to "anon";

grant references on table "public"."streams" to "anon";

grant select on table "public"."streams" to "anon";

grant trigger on table "public"."streams" to "anon";

grant truncate on table "public"."streams" to "anon";

grant update on table "public"."streams" to "anon";

grant delete on table "public"."streams" to "authenticated";

grant insert on table "public"."streams" to "authenticated";

grant references on table "public"."streams" to "authenticated";

grant select on table "public"."streams" to "authenticated";

grant trigger on table "public"."streams" to "authenticated";

grant truncate on table "public"."streams" to "authenticated";

grant update on table "public"."streams" to "authenticated";

grant delete on table "public"."streams" to "service_role";

grant insert on table "public"."streams" to "service_role";

grant references on table "public"."streams" to "service_role";

grant select on table "public"."streams" to "service_role";

grant trigger on table "public"."streams" to "service_role";

grant truncate on table "public"."streams" to "service_role";

grant update on table "public"."streams" to "service_role";

create policy "select_checks"
on "public"."checks"
as permissive
for select
to authenticated
using (((account_id = auth.uid()) OR has_role_on_account(account_id)));


create policy "delete_streams"
on "public"."streams"
as permissive
for delete
to public
using (((account_id = auth.uid()) OR has_permission(auth.uid(), account_id, 'streams.delete'::app_permissions)));


create policy "insert_streams"
on "public"."streams"
as permissive
for insert
to public
with check (((account_id = auth.uid()) OR has_permission(auth.uid(), account_id, 'streams.write'::app_permissions)));


create policy "select_streams"
on "public"."streams"
as permissive
for select
to authenticated
using (((account_id = auth.uid()) OR has_role_on_account(account_id)));


create policy "update_streams"
on "public"."streams"
as permissive
for update
to public
using (((account_id = auth.uid()) OR has_permission(auth.uid(), account_id, 'streams.write'::app_permissions)))
with check (((account_id = auth.uid()) OR has_permission(auth.uid(), account_id, 'streams.write'::app_permissions)));
