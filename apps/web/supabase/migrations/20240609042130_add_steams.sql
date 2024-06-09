alter type "public"."app_permissions" rename to "app_permissions__old_version_to_be_dropped";

create type "public"."app_permissions" as enum ('roles.manage', 'billing.manage', 'settings.manage', 'members.manage', 'invites.manage', 'streams.write', 'streams.delete');

create table "public"."streams" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(500) not null,
    "url" character varying(50000) not null,
    "account_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."streams" enable row level security;

alter table "public"."role_permissions" alter column permission type "public"."app_permissions" using permission::text::"public"."app_permissions";

drop type "public"."app_permissions__old_version_to_be_dropped";

CREATE UNIQUE INDEX streams_pkey ON public.streams USING btree (id);

alter table "public"."streams" add constraint "streams_pkey" PRIMARY KEY using index "streams_pkey";

alter table "public"."streams" add constraint "streams_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) not valid;

alter table "public"."streams" validate constraint "streams_account_id_fkey";

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


CREATE TRIGGER accounts_teardown AFTER DELETE ON public.accounts FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:5173/api/db/webhook', 'POST', '{"Content-Type":"application/json", "X-Supabase-Event-Signature":"WEBHOOKSECRET"}', '{}', '5000');

CREATE TRIGGER invitations_insert AFTER INSERT ON public.invitations FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:5173/api/db/webhook', 'POST', '{"Content-Type":"application/json", "X-Supabase-Event-Signature":"WEBHOOKSECRET"}', '{}', '5000');

CREATE TRIGGER subscriptions_delete AFTER DELETE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:5173/api/db/webhook', 'POST', '{"Content-Type":"application/json", "X-Supabase-Event-Signature":"WEBHOOKSECRET"}', '{}', '5000');


