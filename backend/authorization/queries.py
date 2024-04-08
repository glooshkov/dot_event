import graphene
from . import models
from . import types


class Query(graphene.ObjectType):
    site = graphene.Field(types.SiteType)
    all_user = graphene.List(types.UserType)
    current_user = graphene.Field(types.UserType, id=graphene.ID())
    event_details = graphene.Field(types.EventType, id=graphene.ID(), id_event=graphene.ID())

    all_events = graphene.List(types.EventType)
    all_events_by_financial_region = graphene.List(types.EventType)

    all_events_by_user = graphene.List(types.EventType, id=graphene.ID())
    all_user_events_calendar = graphene.List(types.UserType, id=graphene.ID())
    all_user_events_by_financial = graphene.List(types.EventType, id=graphene.ID())


    def resolve_site(root, info):
        return (
            models.Site.objects.first()
        )

    def resolve_all_user(root, info):
        return (
            models.User.objects.all()
        )

    def resolve_all_events_by_user(root, info, id):
        user = models.User.objects.get(id__iexact=id)
        return (
            user.event_log.all()
        )



    def resolve_all_events(root, info):
        return (
            models.Event.objects.all()
        )

    def resolve_current_user(root, info, id):
        return (
            models.User.objects.get(id=id)
        )

    def resolve_event_details(root, info, id, id_event):
        user = models.User.objects.get(id__iexact=id)
        return (
            user.event_log.get(id__iexact=id_event)
        )

    def resolve_all_events_by_financial_region(root, info):
        return models.Event.objects.all()

    def resolve_all_user_events_by_financial(root, info, id):
        user = models.User.objects.get(id__iexact=id)
        return (
            user.event_log.all()
        )

    def resolve_all_user_events_calendar(root, info, id):
        user = models.User.objects.get(id__iexact=id)
        return (
            user.event_log.all()
        )
